import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { useState, useEffect, useRef, Suspense } from "react";
import {
  BakeShadows,
  Effects,
  PerspectiveCamera,
  Reflector,
  useTexture,
} from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";
import gsap from "gsap";

import Character from "../components/Character";
import LoadingSpinner from "../components/Spinner";

extend({ UnrealBloomPass });

const TechWorld = React.lazy(() => import("@/components/Worlds/TechWorld"));
const HealthcareWorld = React.lazy(
  () => import("@/components/Worlds/HealthCareWorld")
);

export default function SceneManager() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const characterRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const { viewport } = useThree();

  const worldWidth = viewport.width + 5;
  const [worldOffset, setWorldOffset] = useState(0);
  const [targetWorldOffset, setTargetWorldOffset] = useState(0);
  const [activeWorldIndex, setActiveWorldIndex] = useState(0);

  const worlds = [
    { component: TechWorld, environment: "sky" },
    { component: HealthcareWorld, environment: "rain" },
    // Add more worlds if needed
  ];

  const minOffset = 0;
  const maxOffset = -worldWidth * (worlds.length - 1);

  // const handleMove = (direction: "left" | "right") => {
  //   setWorldOffset((prev) => {
  //     const newOffset = direction === "right" ? prev - 0.01 : prev + 0.01;
  //     return Math.max(Math.min(newOffset, minOffset), maxOffset);
  //   });
  // };

  // Move left or right by 1px when called
  const handleMove = (direction: "left" | "right") => {
    setTargetWorldOffset((prev) => {
      const newOffset = direction === "right" ? prev - 1 : prev + 1;
      return Math.max(Math.min(newOffset, minOffset), maxOffset);
    });
  };

  // Smoothly animate worldOffset to targetWorldOffset
  useFrame(() => {
    setWorldOffset(
      (prev) => THREE.MathUtils.lerp(prev, targetWorldOffset, 0.02) // Adjust lerp factor as needed
    );
  });

  // Track active world index based on the current offset
  useEffect(() => {
    const index = Math.round(Math.abs(worldOffset / worldWidth));
    setActiveWorldIndex(index);
  }, [worldOffset, worldWidth]);

  useEffect(() => {
    if (cameraRef.current) {
      gsap.fromTo(
        cameraRef.current,
        { fov: 40 },
        {
          fov: 75,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => {
            cameraRef.current?.updateProjectionMatrix();
          },
        }
      );
    }
  }, []);

  const { lightIntensity, lightColor, lightX, lightY, lightZ } = useControls(
    "Directional Light",
    {
      lightIntensity: { value: 1.5, min: 0, max: 2 },
      lightColor: "#ffffff",
      lightX: { value: 60, min: -100, max: 100 },
      lightY: { value: 100, min: -100, max: 100 },
      lightZ: { value: 100, min: -100, max: 100 },
    }
  );

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.intensity = lightIntensity;
      lightRef.current.color = new THREE.Color(lightColor);
      lightRef.current.position.set(lightX, lightY, lightZ);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={110}
        position={[0, 0, 7.5]}
      />
      {/* Moving worlds group */}
      <group position={[worldOffset, 0, 0]}>
        {worlds.map((world, index) => {
          const WorldComponent = world.component;
          return (
            <Suspense key={index} fallback={<LoadingSpinner />}>
              <WorldComponent
                isActive={activeWorldIndex === index}
                position={[index * worldWidth, 0, 0]}
              />
            </Suspense>
          );
        })}
      </group>
      <ambientLight intensity={1} />
      <directionalLight
        ref={lightRef}
        intensity={lightIntensity}
        color={lightColor}
        position={[lightX, lightY, lightZ]}
        castShadow
      />
      <spotLight position={[0, 10, 0]} intensity={0.3} />
      <Character positionX={0} onMove={handleMove} ref={characterRef} />
      {/* <Effects disableGamma>
        <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
      </Effects> */}
      {/* <BakeShadows />
      <group position={[0, -1, 0]} scale={[10, 10, 10]}>
        <Ground />
      </group> */}
      {/* <OrbitControls /> */}
      {/* <RoadStraight /> */}
    </>
  );
}

function Ground() {
  const [floor, normal] = useTexture([
    "/textures/SurfaceImperfections003_1K_var1.jpg",
    "/textures/SurfaceImperfections003_1K_Normal.jpg",
  ]);
  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[10, 10]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      {(Material, props) => (
        <Material
          color="#5b5757"
          metalness={0.1}
          roughnessMap={floor}
          normalMap={normal}
          {...props}
        />
      )}
    </Reflector>
  );
}

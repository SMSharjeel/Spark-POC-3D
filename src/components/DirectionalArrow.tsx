import React, { useState, useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { GroupProps, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three"; // Make sure to import THREE

const DirectinalArrow: React.FC<GroupProps> = (props) => {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF("/directional_arrow_1.glb");
  const { actions } = useAnimations(animations, group);

  const [isAnimating, setIsAnimating] = useState(false);

  // Cursor styling functions
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer"; // Change the cursor on hover

    // Stop animation on hover
    if (actions && actions["CINEMA_4D_Main"]) {
      actions["CINEMA_4D_Main"].stop();
      setIsAnimating(false); // Set isAnimating to false when stopped
    }
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "auto"; // Reset the cursor when leaving the model

    // Restart animation when hover ends
    if (actions && actions["CINEMA_4D_Main"]) {
      actions["CINEMA_4D_Main"].play();
      setIsAnimating(true); // Set isAnimating to true when animation starts
    }
  };

  // Start the animation when component is mounted
  useEffect(() => {
    if (actions && actions["CINEMA_4D_Main"]) {
      actions["CINEMA_4D_Main"].play();
      setIsAnimating(true); // Set isAnimating to true when animation starts
    }

    // Cleanup animation
    return () => {
      if (actions && actions["CINEMA_4D_Main"]) {
        actions["CINEMA_4D_Main"].stop();
      }
    };
  }, [actions]);

  // Handle click event only if animation is not playing
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (isAnimating) {
      console.log("Animation is still playing. Click ignored.");
      return; // Prevent click if animation is running
    }

    console.log("Model clicked!");
    props.onClick?.(event); // Proceed with the click if no animation is running
  };

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onClick={handleClick} // Use the updated onClick event
      onPointerOver={handlePointerOver} // Change cursor and stop animation on hover
      onPointerOut={handlePointerOut} // Reset cursor and restart animation when leaving
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="7dd6bac68a78478f96774c2b32872855fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Cube_2"
                  position={[-2.121, 1852.212, 0]}
                  rotation={[Math.PI / 2, Math.PI / 4, 0]}
                  scale={0.953}
                >
                  <mesh
                    name="Cube_2_Mat_0"
                    geometry={nodes.Cube_2_Mat_0.geometry}
                    material={materials.material}
                  />
                  <mesh
                    name="Cube_2_Mat1_0"
                    geometry={nodes.Cube_2_Mat1_0.geometry}
                    material={materials["Mat.1"]}
                  />
                  <mesh
                    name="Cube_2__0"
                    geometry={nodes.Cube_2__0.geometry}
                    material={materials.Cube_2__0}
                  />
                </group>
                <group
                  name="Cube_1"
                  position={[-2.121, 1352.212, 0]}
                  rotation={[Math.PI / 2, Math.PI / 4, 0]}
                  scale={0.953}
                >
                  <mesh
                    name="Cube_1_Mat_0"
                    geometry={nodes.Cube_1_Mat_0.geometry}
                    material={materials.material}
                  />
                  <mesh
                    name="Cube_1_Mat1_0"
                    geometry={nodes.Cube_1_Mat1_0.geometry}
                    material={materials["Mat.1"]}
                  />
                  <mesh
                    name="Cube_1__0"
                    geometry={nodes.Cube_1__0.geometry}
                    material={materials.Cube_2__0}
                  />
                </group>
                <group
                  name="Cube"
                  position={[-2.121, 752.212, 0]}
                  rotation={[Math.PI / 2, Math.PI / 4, 0]}
                  scale={0.953}
                >
                  <mesh
                    name="Cube_Mat_0"
                    geometry={nodes.Cube_Mat_0.geometry}
                    material={materials.material}
                  />
                  <mesh
                    name="Cube_Mat1_0"
                    geometry={nodes.Cube_Mat1_0.geometry}
                    material={materials["Mat.1"]}
                  />
                  <mesh
                    name="Cube__0"
                    geometry={nodes.Cube__0.geometry}
                    material={materials.Cube_2__0}
                  />
                </group>
                <group
                  name="CINEMA_4D_Editor"
                  position={[1621.037, 3436.833, -8719.761]}
                  rotation={[-Math.PI, -1.277, 2.793]}
                >
                  <group name="Object_5" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default React.memo(DirectinalArrow);

useGLTF.preload("/directional_arrow_1.glb");

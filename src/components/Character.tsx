/* eslint-disable react/display-name */
// src/components/Character.tsx
import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

interface CharacterProps {
  onMove: (direction: "left" | "right") => void; // Only triggers on left and right
  positionX: number; // Character's fixed position on the x-axis
}

const Character = forwardRef<THREE.Group, CharacterProps>(
  ({ onMove, positionX }, ref) => {
    const { scene, animations } = useGLTF("/man.glb"); // Load the GLTF model
    const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const groupRef = ref as React.MutableRefObject<THREE.Group>; // Explicitly typed ref
    const { actions } = useAnimations(animations, groupRef); // Hook for handling animations

    const [currentDirection, setCurrentDirection] = useState<
      "left" | "right" | "up" | "down" | null
    >(null);
    const [isMoving, setIsMoving] = useState(false);

    // Play the walking animation when the key is held down and stop on release
    useEffect(() => {
      if (actions && actions["Take 001"]) {
        if (isMoving) {
          actions["Take 001"].play();
        } else {
          actions["Take 001"].stop();
        }
      }
    }, [actions, isMoving]);

    // Rotate the character based on direction
    const rotateCharacter = (direction: "left" | "right" | "up" | "down") => {
      if (groupRef.current && currentDirection !== direction) {
        setCurrentDirection(direction);
        let rotationY = 0;
        switch (direction) {
          case "left":
            rotationY = -Math.PI / 2; // Face down

            break;
          case "right":
            rotationY = Math.PI / 2; // Face up
            break;
          case "up":
            rotationY = 0; // Face right (default)
            break;
          case "down":
            rotationY = Math.PI; // Face left

            break;
        }
        groupRef.current.rotation.y = rotationY;
      }
    };

    // Handle key press events for rotation and movement
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        onMove("right"); // Move world to the right
        rotateCharacter("right");
        setIsMoving(true);
      } else if (e.key === "ArrowLeft") {
        onMove("left"); // Move world to the left
        rotateCharacter("left");
        setIsMoving(true);
      } else if (e.key === "ArrowUp") {
        rotateCharacter("up"); // Only rotate to face up, no movement
        setIsMoving(true);
      } else if (e.key === "ArrowDown") {
        rotateCharacter("down"); // Only rotate to face down, no movement
        setIsMoving(true);
      }
    };

    // Stop movement when the key is released
    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        (e.key === "ArrowRight" && currentDirection === "right") ||
        (e.key === "ArrowLeft" && currentDirection === "left") ||
        (e.key === "ArrowUp" && currentDirection === "up") ||
        (e.key === "ArrowDown" && currentDirection === "down")
      ) {
        setIsMoving(false);
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, [currentDirection]);

    // Update position frame-by-frame
    useFrame(() => {
      if (groupRef.current) {
        groupRef.current.position.x = positionX; // Fixed at center
      }
    });

    return (
      <group
        ref={groupRef}
        position={[positionX, -1, 0]}
        scale={[0.01, 0.01, 0.01]}
      >
        <primitive object={clonedScene} />
      </group>
    );
  }
);

export default Character;
useGLTF.preload("/man.glb");

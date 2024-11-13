// src/components/World.tsx
import { GroupProps, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { AudioLoader } from "three";
import * as THREE from "three";

interface WorldProps extends GroupProps {
  name: string;
  backgroundColor: string;
  soundSrc: string;
  children: React.ReactNode;
}

export default function World({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  name,
  backgroundColor,
  soundSrc,
  children,
  ...props
}: WorldProps) {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(backgroundColor);

    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    const audioLoader = new AudioLoader();
    audioLoader.load(soundSrc, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.play();
    });

    scene.add(listener);
    return () => {
      sound.stop();
      scene.remove(listener);
    };
  }, [backgroundColor, soundSrc, scene]);

  return <group {...props}>{children}</group>;
}

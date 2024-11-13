"use client";

import SceneManager from "@/components/SceneManager";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div className="overflow-hidden w-full h-screen">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 5.5], fov: 80 }}
        shadows
      >
        <SceneManager />
      </Canvas>
    </div>
  );
}

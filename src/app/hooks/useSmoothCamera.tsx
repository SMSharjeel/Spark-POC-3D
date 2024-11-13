import { useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
export function useSmoothCamera(
  camera: THREE.PerspectiveCamera,
  position: [number, number, number],
  duration = 1.5
) {
  useEffect(() => {
    if (camera?.position) {
      gsap.to(camera.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration,
        ease: "power3.inOut",
      });
    }
  }, [camera, position, duration]);
}

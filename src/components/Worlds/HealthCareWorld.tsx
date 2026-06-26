import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import HealthcareModel from "../models/HealthcareModel";
import World from "../World";
import Trees from "../models/Trees";
import SkyscraperCModel from "../models/SkyscraperCModel";
import DirectionalArrow from "../DirectionalArrow";
import InfoCard from "../InfoCard";

interface HealthcareWorldProps {
  position: [number, number, number];
  isActive: boolean;
}

export default function HealthcareWorld({
  position,
  isActive,
}: HealthcareWorldProps) {
  const details = {
    title: "Health World",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.",
    image: "/images/fut_hos.jpg",
    info: [
      {
        title: "About Health World",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/fut_hos.jpg",
      },
      {
        title: "Vision",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/fut_hos.jpg",
      },
      {
        title: "Mission",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/fut_hos.jpg",
      },
      {
        title: "Core Values",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/fut_hos.jpg",
      },
    ],
  };

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (isActive) {
      console.log("HealthcareWorld is active");
    }
  }, [isActive]);

  return (
    <World
      name="HealthcareWorld"
      backgroundColor="#001d3d"
      soundSrc="/sounds/healthcare_ambience.mp3"
      position={position}
    >
      <DirectionalArrow
        onClick={() => setIsSheetOpen(true)}
        scale={[0.2, 0.2, 0.2]}
        position={[0, 4, -5]}
      />
      <HealthcareModel position={[0, -0.9, -7]} scale={[0.4, 0.4, 0.4]} />
      <Trees
        position={[3, -0.7, 9]}
        scale={[2, 2, 2]}
        selectedMeshName="_10_tree__10_tree_0"
        rotation={[0, Math.PI / 3, 0]}
      />
      <SkyscraperCModel position={[25, -0.8, -11]} scale={[3, 3, 3]} />

      {isSheetOpen && (
        <Html position={[0, 0, 0]} center>
          <InfoCard
            details={details}
            open={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
          />
        </Html>
      )}
    </World>
  );
}

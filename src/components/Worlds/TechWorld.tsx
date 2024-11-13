import { useEffect, useState } from "react";
import World from "../World";
import { Html, OrbitControls, Sky } from "@react-three/drei";
import Trees from "../models/Trees";
import BuildingBModel from "../models/BuildingBModel";
import Stars from "../Stars";
import SciFiPanels from "../SciFiPanels";
import DirectionalArrow from "../DirectionalArrow";
import SmallBuildingDModel from "../models/SmallBuildingDModel";
import InfoCard from "../InfoCard";

interface TechWorldProps {
  position: [number, number, number];
  isActive: boolean;
}

export default function TechWorld({ position, isActive }: TechWorldProps) {
  const details = {
    title: "Tech World",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.",
    image: "/images/future_tech.png",
    info: [
      {
        title: "About Tech World",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/future_tech.png",
      },
      {
        title: "Vision",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/future_tech.png",
      },
      {
        title: "Mission",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/future_tech.png",
      },
      {
        title: "Core Values",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/future_tech.png",
      },
    ],
  };

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (isActive) {
      console.log("Sky environment active in TechWorld");
    }
  }, [isActive]);

  return (
    <World
      name="TechWorld"
      backgroundColor="#202030"
      soundSrc="/sounds/tech_ambience.mp3"
      position={position}
    >
      <color attach="background" args={["#202030"]} />
      <fog attach="fog" args={["#202030", 10, 25]} />
      {isActive && <Sky sunPosition={[100, 10, 100]} distance={1000} />}{" "}
      {isActive && <fog attach="fog" args={["white", 0, 500]} />}
      <DirectionalArrow
        scale={[0.2, 0.2, 0.2]}
        position={[-5, 3, -5]}
        rotation={[0.1, 0.7, 0]}
        onClick={() => setIsSheetOpen(true)}
      />
      <SciFiPanels
        scale={[0.02, 0.02, 0.02]}
        position={[-5, 0.5, -5]}
        rotation={[0.1, 0.7, 0]}
      />
      <Stars />
      <Trees
        position={[6, -1, -4]}
        scale={[1.6, 1.6, 1.6]}
        selectedMeshName="_6_tree__6_tree_0"
      />
      <Trees
        position={[5, -1, -4]}
        scale={[1.6, 1.6, 1.6]}
        selectedMeshName="_11_tree__11_tree_0"
      />
      <Trees
        position={[23, -1, -3]}
        scale={[1.6, 1.6, 1.6]}
        selectedMeshName="_7_tree__7_tree_0"
        // rotation={[0, Math.PI / 5, 0]}
      />
      <BuildingBModel position={[7, -1, -10]} scale={[4, 4, 4]} />
      <BuildingBModel position={[10, -1, -10]} scale={[4, 4, 4]} />
      <BuildingBModel position={[20, -1, -10]} scale={[4, 4, 4]} />
      <SmallBuildingDModel position={[35, -1, -10]} scale={[4, 4, 4]} />
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

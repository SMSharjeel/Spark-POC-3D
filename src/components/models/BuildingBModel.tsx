/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 city/large_buildingB.glb 
*/

import { FC, memo } from "react";
import { useGLTF } from "@react-three/drei";

import { GroupProps } from "@react-three/fiber";

const Model: FC<GroupProps> = (props) => {
  const { nodes, materials } = useGLTF("/city/large_buildingB.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Mesh_large_buildingB.geometry}
        material={materials.border}
      />
      <mesh
        geometry={nodes.Mesh_large_buildingB_1.geometry}
        material={materials.door}
      />
      <mesh
        geometry={nodes.Mesh_large_buildingB_2.geometry}
        material={materials.window}
      />
      <mesh
        geometry={nodes.Mesh_large_buildingB_3.geometry}
        material={materials.roof}
      />
      <mesh
        geometry={nodes.Mesh_large_buildingB_4.geometry}
        material={materials._defaultMat}
      />
    </group>
  );
};

export default memo(Model);

useGLTF.preload("/city/large_buildingB.glb");

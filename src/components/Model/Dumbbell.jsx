import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Dumbbell(props) {
    const { nodes, materials } = useGLTF("./dumbbell-transformed.glb");
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.pCylinder1_lambert1_0.geometry} material={materials.lambert1} />
            <mesh geometry={nodes.pSphere1_lambert1_0.geometry} material={materials.lambert1} />
            <mesh geometry={nodes.pCylinder7_lambert1_0.geometry} material={materials.lambert1} />
            <mesh geometry={nodes.pCylinder8_lambert1_0.geometry} material={materials.lambert1} />
        </group>
    );
}

useGLTF.preload("/dumbbell-transformed.glb");

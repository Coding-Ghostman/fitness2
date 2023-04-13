import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Dumbbell from "../Model/Dumbbell";

const DumbbellDesign = () => {
    return (
        <>
            <Canvas>
                <Suspense fallback={null}>
                    <ambientLight color="#ef32ef" intensity={2} visible />
                    <directionalLight intensity={2} position={[3, 8, 1]} />
                    <directionalLight intensity={1} position={[3, -8, 1]} />
                    <directionalLight intensity={1} position={[-3, -3, -3]} />
                    <Dumbbell scale={0.6} />
                    <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} autoRotate />
                </Suspense>
            </Canvas>
        </>
    );
};

export default DumbbellDesign;

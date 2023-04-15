import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Dumbbell from "../Model/Dumbbell";
import Room from "../Model/Room";

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
                    <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} autoRotate autoRotateSpeed={2} />
                </Suspense>
            </Canvas>
        </>
    );
};

export default DumbbellDesign;

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Meditation from "../Model/Meditation";

const DumbbellDesign = () => {
    return (
        <>
            <Canvas height="1200px">
                <Suspense fallback={null}>
                    <ambientLight color="#da4ea2" intensity={1} visible />
                    <directionalLight intensity={1} position={[3, 8, 1]} />
                    <Meditation scale={0.6} />
                    <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} autoRotate autoRotateSpeed={2} />
                </Suspense>
            </Canvas>
        </>
    );
};

export default DumbbellDesign;

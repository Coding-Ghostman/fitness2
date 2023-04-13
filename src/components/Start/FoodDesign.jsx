import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import FoodTruck from "../Model/FoodTruck";

const FoodDesign = () => {
    return (
        <>
            <Canvas height="1200px">
                <Suspense fallback={null}>
                    <ambientLight color="#ea9eae" intensity={3} visible />
                    <directionalLight color="#ea9eae" intensity={5.5} position={[3, 8, 1]} />
                    <FoodTruck scale={0.4} position={[0, -0.3, 0]} />
                    <OrbitControls enableRotate={false} enableZoom={false} autoRotate autoRotateSpeed={2.5} />
                </Suspense>
            </Canvas>
        </>
    );
};

export default FoodDesign;

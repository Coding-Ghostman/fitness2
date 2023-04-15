import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Dumbbell from "../Model/Dumbbell";
import Room from "../Model/Room";

const DumbbellDesign = () => {
    return (
        <>
            <Suspense fallback={null}>
                <Room />
            </Suspense>
        </>
    );
};

export default DumbbellDesign;

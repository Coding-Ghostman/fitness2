import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import styled from "styled-components";
import Dumbbell from "../Dumbbell";

const DumbbellDesign = () => {
    // const [mousePosition, setMousePosition] = useState([0, 0]);
    // const canvasRef = useRef();

    // useEffect(() => {
    //     const canvas = canvasRef.current;

    //     const handleMouseMove = (event) => {
    //         const { clientX, clientY } = event;
    //         const x = (clientX / canvas.clientWidth) * 2 - 1;
    //         const y = -(clientY / canvas.clientHeight) * 2 + 1;
    //         setMousePosition([x, y]);
    //     };

    //     canvas.addEventListener("mousemove", handleMouseMove);

    //     return () => {
    //         canvas.removeEventListener("mousemove", handleMouseMove);
    //     };
    // }, []);

    return (
        <>
            <Canvas>
                <Suspense fallback={null}>
                    <ambientLight color="#082028" intensity={2} visible />
                    <directionalLight intensity={2} position={[3, 8, 1]} />
                    <directionalLight intensity={1} position={[3, -8, 1]} />
                    <directionalLight intensity={1} position={[-3, -3, -3]} />
                    <Dumbbell scale={0.6} />
                    <OrbitControls enableZoom={false} autoRotate />
                </Suspense>
            </Canvas>
        </>
    );
};

export default DumbbellDesign;

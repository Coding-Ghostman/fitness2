import styled from "styled-components";
import TextAnimation from "../Animation/TextAnimation";
import { Canvas, useFrame } from "react-three-fiber";
import { Suspense, useRef, useState } from "react";
import { MeshDistortMaterial, OrbitControls, Sphere } from "@react-three/drei";
import { Vector3 } from "three";

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 5;
    justify-content: space-between;
    @media only screen and (max-width: 768px) {
        height: 200vh;
    }
`;

const Container = styled.div`
    height: 100%;
    scroll-snap-align: center;
    width: 1400px;
    display: flex;
    justify-content: space-between;
    z-index: 5;
    @media only screen and (max-width: 768px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const Left = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    z-index: 5;
    @media only screen and (max-width: 768px) {
        flex: 1;
        align-items: center;
    }
`;

const Title = styled.h1`
    font-size: 68px;
    z-index: 5;
    @media only screen and (max-width: 768px) {
        text-align: center;
    }
`;

const Desc = styled.p`
    font-size: 24px;
    color: lightgray;
    z-index: 5;
    @media only screen and (max-width: 768px) {
        padding: 20px;
        text-align: center;
    }
`;

const Button = styled.button`
    background-color: #da4ea2;
    color: white;
    font-weight: 500;
    width: 120px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Right = styled.div`
    flex: 3;
    position: relative;
    @media only screen and (max-width: 768px) {
        flex: 1;
        width: 100%;
    }
`;

const ImgFront = styled.img`
    width: 700px;
    height: 500px;
    object-fit: contain;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    pointer-events: none;
    animation: animate 2s infinite ease-in-out alternate;

    @media only screen and (max-width: 768px) {
        width: 300px;
        height: 300px;
    }

    @keyframes animate {
        to {
            transform: translateY(30px);
        }
    }
`;

const ImgBack = styled.img`
    width: 700px;
    height: 500px;
    object-fit: contain;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    pointer-events: none;
    animation: animate 3s infinite ease-in-out alternate;

    @media only screen and (max-width: 768px) {
        width: 300px;
        height: 300px;
    }

    @keyframes animate {
        to {
            transform: translateY(50px);
        }
    }
`;

const ImgObjects = styled.img`
    width: 700px;
    height: 500px;
    object-fit: contain;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    pointer-events: none;
    animation: animate 4s infinite ease-in-out alternate;

    @media only screen and (max-width: 768px) {
        width: 300px;
        height: 300px;
    }

    @keyframes animate {
        to {
            transform: translateY(30px);
        }
    }
`;

function MovingSphere({ isMouseInside }) {
    const sphereRef = useRef();
    const originalPosition = new Vector3(0, 0, -0.8);
    console.log(sphereRef);
    useFrame(({ mouse }) => {
        const updatedPosition = new Vector3(mouse.x * 0.5, mouse.y * 0.5, 0);
        if (isMouseInside) {
            // sphereRef.current.position.x = mouse.x * 0.5;
            // sphereRef.current.position.y = mouse.y * 0.5;
            sphereRef.current.position.lerp(updatedPosition, 0.1);
        } else {
            sphereRef.current.position.lerp(originalPosition, 0.1);
        }
    });

    return (
        <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.1}>
            <MeshDistortMaterial color="#082028" attach="material" distort={0.5} speed={3} />
        </Sphere>
    );
}

function Hero({ handleClick }) {
    const [isMouseInside, setIsMouseInside] = useState(false);

    return (
        <Section>
            <Container>
                <Left>
                    <Title className="font-mono font-bold">
                        <TextAnimation>POWERING YOUR</TextAnimation>
                        <br />
                        <TextAnimation>WORKOUT WITH</TextAnimation> <span className="text-gradient font-mono -ml-2">AI</span>
                    </Title>
                    <Desc>Fuel the future of workout with the combination of AI with health routines.</Desc>
                    <Button className="interactable" onClick={handleClick}>
                        Learn More
                    </Button>
                </Left>

                <Right>
                    <Canvas onPointerMove={(e) => setIsMouseInside(true)} onPointerOut={(e) => setIsMouseInside(false)}>
                        <Suspense fallback={null}>
                            <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} />
                            <ambientLight intensity={6} />
                            <directionalLight intensity={2} position={[3, 2, 1]} />
                            <MovingSphere isMouseInside={isMouseInside} />
                        </Suspense>
                    </Canvas>
                    <div>
                        <ImgBack src="./img/yoga_back.png" />
                        <ImgFront src="./img/yoga_front.png" />
                        <ImgObjects src="./img/yoga_objects.png" />
                    </div>
                </Right>
            </Container>
        </Section>
    );
}
export default Hero;

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import RoomDesign from "./RoomDesign";
import Link from "../link/Link";
import TextAnimation from "../Animation/TextAnimation";

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    z-index: 5;
    background: #fb8994;
    background-size: cover;
    justify-content: center;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        background: linear-gradient(to right, #f953c6, #b91d73);
    }
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
    }
`;

const Container = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    z-index: 5;
    width: 1400px;
    display: flex;

    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;
    position: absolute;
    width: 110vw;
    height: 100vh;
    margin-left: -180px;
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const Title = styled.h1`
    font-size: 68px;

    @media only screen and (max-width: 768px) {
        font-size: 60px;
    }
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    position: absolute;
    width: 800px;
    top: 30%;
    @media only screen and (max-width: 768px) {
        align-items: center;
        text-align: center;
    }
`;

const Desc = styled.p`
    font-size: 24px;
    color: #080808;
    font-weight: 800;
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

const Who = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const containerRect = container.getBoundingClientRect();
            const containerX = containerRect.left;
            const containerY = containerRect.top;
            const backgroundPosX = -(((mouseX - containerX) / containerRect.width) * 80);
            const backgroundPosY = -(((mouseY - containerY) / containerRect.height) * 80);

            container.style.backgroundPosition = `${backgroundPosX * 0.08}% ${backgroundPosY * 0.08}%`;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <Section ref={containerRef} style={{ backgroundClip: "unset" }}>
            <Container>
                <Left className="left">
                    <RoomDesign />
                </Left>
                <Right className="right select-none">
                    <Title className="font-mono font-bold select-none">
                        <TextAnimation>TRACK EVERY MOVE</TextAnimation> <TextAnimation time>IN EVERY</TextAnimation>
                        <span className="pointer-events-none select-none text-gradient font-mono -ml-2"> DIMENSION</span>
                    </Title>
                    <Desc className="select-none">Track your progress like never before with 3D motion tracking.</Desc>
                    <Link to="/workout">
                        <Button className="interactable">Try out</Button>
                    </Link>
                </Right>
            </Container>
        </Section>
    );
};

export default Who;

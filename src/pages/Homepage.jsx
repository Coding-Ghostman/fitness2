import Hero from "../components/Start/Hero";
import styled from "styled-components";
import Who from "../components/Start/Who";
import { useEffect, useRef } from "react";
import "./Page.css";
import About from "../components/Start/About";

const Container = styled.div`
    height: 100vh;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow-y: auto;
    scrollbar-width: none;
    color: white;
    -webkit-scroll-snap-type: mandatory;
    background: url("./img/bg.jpg");
    -ms-scroll-snap-type: mandatory;
    &::-webkit-scrollbar {
        display: none;
    }
`;

function HomePage() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const containerRect = container.getBoundingClientRect();
            const containerX = containerRect.left;
            const containerY = containerRect.top;
            const backgroundPosX = -(((mouseX - containerX) / containerRect.width) * 15);
            const backgroundPosY = -(((mouseY - containerY) / containerRect.height) * 15);

            container.style.backgroundPosition = `${backgroundPosX * 0.15}% ${backgroundPosY * 0.15}%`;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div>
            <Container ref={containerRef} style={{ backgroundClip: "unset" }}>
                <Hero />
                <Who />
                <About />
            </Container>
        </div>
    );
}

export default HomePage;

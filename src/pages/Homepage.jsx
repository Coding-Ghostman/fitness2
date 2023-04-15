/* eslint-disable react-hooks/exhaustive-deps */
import Hero from "../components/Start/Hero";
import styled from "styled-components";
import Who from "../components/Start/Who";
import { useEffect, useRef } from "react";
import "./Page.css";
import About from "../components/Start/About";

const Container = styled.div`
    height: 100vh;
    scroll-snap-type: y mandatory;
    -webkit-scroll-snap-type: mandatory;
    -ms-scroll-snap-type: mandatory;
    scroll-behavior: smooth;
    overflow-y: auto;
    scrollbar-width: none;
    color: white;
    background: url("./img/bg.jpg");
    &::-webkit-scrollbar {
        display: none;
    }
`;
function HomePage({ setScrollTop }) {
    const containerRef = useRef(null);

    useEffect(() => {
        function handleScroll() {
            const scrollTop = containerRef.current.scrollTop;
            const threshold = 200; // change this value to adjust when the event should trigger

            if (scrollTop > threshold) {
                setScrollTop(true);
            } else {
                setScrollTop(false);
            }
        }

        const container = containerRef.current;

        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            const container = containerRef.current;

            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);
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

            if (container) {
                container.style.backgroundPosition = `${backgroundPosX * 0.15}% ${backgroundPosY * 0.15}%`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window?.removeEventListener("mousemove", handleMouseMove);
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

import Hero from "../components/Start/Hero";
import styled from "styled-components";
import Who from "../components/Start/Who";
import bg from "../assets/bg.jpg";
import { useEffect, useRef } from "react";
import "./Page.css";

const Container = styled.div`
    height: 100vh;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow-y: auto;
    scrollbar-width: none;
    color: white;
    -webkit-scroll-snap-type: mandatory;
    -ms-scroll-snap-type: mandatory;
    &::-webkit-scrollbar {
        display: none;
    }
`;
function HomePage() {
    const containerRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const img = imgRef.current;

        const handleMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            img.style.transform = `translate(-${x * 15}px, -${y * 15}px)`;
        };

        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    return (
        <div ref={containerRef} className="z-0 bottom bg-cover">
            <img ref={imgRef} className="absolute z-0 bg-cover" src={bg} alt="" />
            <Container>
                <Hero />
                <Who />
            </Container>
        </div>
    );
}
export default HomePage;

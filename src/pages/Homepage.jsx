import Hero from "../components/Start/Hero";
import styled from "styled-components";
import Who from "../components/Start/Who";
import { useRef } from "react";
const Container = styled.div`
    height: 100vh;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow-y: auto;
    scrollbar-width: none;
    color: white;
    -webkit-scroll-snap-type: mandatory;
    -ms-scroll-snap-type: mandatory;
    background: url("./img/bg.jpg");
    &::-webkit-scrollbar {
        display: none;
    }
`;
function HomePage() {
    return (
        <Container>
            <Hero />
            <Who />
        </Container>
    );
}
export default HomePage;

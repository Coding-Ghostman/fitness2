import React from "react";
import styled from "styled-components";
import DumbbellDesign from "./DumbbellDesign";
import Link from "../link/Link";
import TextAnimation from "../Animation/TextAnimation";

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
`;
// scroll-snap-align: center;
const Container = styled.div`
    height: 100vh;
    scroll-snap-align: center;

    width: 1400px;
    display: flex;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;

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

    @media only screen and (max-width: 768px) {
        align-items: center;
        text-align: center;
    }
`;

const Desc = styled.p`
    font-size: 24px;
    color: lightgray;
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
    return (
        <Section>
            <Container>
                <Left>
                    <DumbbellDesign />
                </Left>
                <Right>
                    <Title className="font-mono font-bold">
                        <TextAnimation>TRACK EVERY MOVE</TextAnimation> <TextAnimation time>IN EVERY</TextAnimation>
                        <span className="text-gradient font-mono -ml-2"> DIMENSION</span>
                    </Title>
                    <Desc>Track your progress like never before with 3D motion tracking.</Desc>
                    <Link to="/workout">
                        <Button>Try out</Button>
                    </Link>
                </Right>
            </Container>
        </Section>
    );
};

export default Who;

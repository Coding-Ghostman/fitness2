import { IconButton, Tooltip } from "@mui/material";
import Card from "../components/Card/Card";
import Link from "../components/link/Link";
import { ArrowBackRounded } from "@mui/icons-material";
import Counter from "../components/Motion/counter";
import { useState } from "react";

const cards = [
    {
        title: "Bicep Curls",
        image: "./img/bicepCurls.gif",
        link: "bicepCurls",
    },
    {
        title: "Crunches",
        image: "./img/crunches.gif",
        link: "crunches",
    },
    {
        title: "Push Ups",
        image: "./img/pushup.gif",
        link: "pushups",
    },
    {
        title: "Squats",
        image: "./img/squats.gif",
        link: "squats",
    },
];

function Workout() {
    const [workout, setWorkout] = useState(null);
    const handleClick = (title) => {
        setWorkout(title);
    };
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient">
                <div className="flex flex-row gap-4">
                    {!workout && <p className="flex flex-row justify-center items-center w-full h-full font-[800] lg:text-3xl sm:text-2xl text-2xl py-8  text-white">Select the training</p>}
                    <div data-type="back" className="items-center justify-center mt-8 interactable">
                        <Tooltip title="Go Back">
                            <Link to="/workout">
                                <IconButton>
                                    <ArrowBackRounded sx={{ color: "#fff" }} />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
                <div className="max-w-screen-xl flex flex-nowrap gap-[200px]">
                    {workout === "Bicep Curls" ? (
                        <Counter handleWorkout={setWorkout} exercise={"bicepCurls"} image={cards[0].image} />
                    ) : workout === "Squats" ? (
                        <Counter handleWorkout={setWorkout} exercise={"squats"} image={cards[3].image} />
                    ) : workout === "Push Ups" ? (
                        <Counter handleWorkout={setWorkout} exercise={"pushups"} image={cards[2].image} />
                    ) : workout === "Crunches" ? (
                        <Counter handleWorkout={setWorkout} exercise={"crunches"} image={cards[1].image} />
                    ) : (
                        cards.map((card) => (
                            <div
                                className="flex -ml-[180px]"
                                onClick={() => {
                                    handleClick(card.title);
                                }}
                            >
                                <Card {...card} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
export default Workout;

import React, { useEffect, useRef } from "react";
import "@lottiefiles/lottie-player";
import { create } from "@lottiefiles/lottie-interactivity";
import "./Loading.css";

const Animation = () => {
    const myRef = useRef(null);
    console.log(myRef);
    useEffect(() => {
        myRef.current.addEventListener("load", function (e) {
            create({
                player: "#eighthLottie",
                mode: "cursor",
                actions: [
                    {
                        position: { x: [0, 1], y: [0, 1] },
                        type: "seek",
                        frames: [0, 280],
                    },
                ],
            });
        });
    }, []);

    return (
        <div>
            <div class="first-section">
                <h1>Sync Animation with the Cursor's Movement </h1>
            </div>
            <div ref={myRef} class="second-section">
                <lottie-player id="eighthLottie" src="https://assets4.lottiefiles.com/packages/lf20_Lybh7B/data.json"></lottie-player>
            </div>
            <div class="third-section"></div>
        </div>
    );
};

export default Animation;

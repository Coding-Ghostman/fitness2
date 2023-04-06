import React, { useRef, useEffect } from "react";
import "./Motion.css";

const MotionTracker = () => {
    const videoRef = useRef();

    useEffect(() => {
        const constraints = { video: true };

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch((error) => console.error("Error accessing camera:", error));
    }, []);

    return (
        <div className="">
            <video className="absolute bg-gradient w-screen" ref={videoRef} style={{ width: "1920px", height: "1080px" }} />{" "}
        </div>
    );
};

export default MotionTracker;

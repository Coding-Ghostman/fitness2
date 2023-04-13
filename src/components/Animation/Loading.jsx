import React, { useEffect, useRef, useState } from "react";
import "./Loading.css";
import lottie from "lottie-web";
import loading from "../../assets/loading.json";

const Loading = () => {
    const [progress, setProgress] = useState(0);
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: loading,
        });
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < 65) {
                setProgress(progress + 1);
            } else if (progress >= 65 && progress <= 70) {
                clearInterval(interval);
                setTimeout(() => {
                    setProgress(progress + 1);
                }, 500);
            } else if (progress === 100) {
            } else {
                setProgress(progress + 1);
            }
        }, 20);

        return () => clearInterval(interval);
    }, [progress]);

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center -top-[15%] bg-[#0f3e4e]">
                <div className="w-40 h-40 scale-[3] " ref={container}></div>
            </div>
            <div className="loading-bar rounded-xl">
                <div className="loading-bar-progress rounded-xl" style={{ width: `${progress}%` }}></div>
                <div className="text-lg font-semibold text-gray-200" style={{ width: `${progress}%` }}>
                    {progress}%
                </div>
            </div>
        </div>
    );
};

export default Loading;

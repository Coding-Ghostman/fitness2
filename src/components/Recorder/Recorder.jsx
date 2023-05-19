import React, { useEffect, useRef } from "react";
import axios from "axios";

const Recorder = ({ ipCameraUrl }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const videoElement = document.createElement("video");
        videoElement.autoplay = true;

        const getVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoElement.srcObject = stream;
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        };

        const drawFrame = () => {
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame);
        };

        const getIPCameraFrame = async () => {
            try {
                const response = await axios.get(ipCameraUrl, { responseType: "blob" });
                const blobUrl = URL.createObjectURL(response.data);
                videoElement.src = blobUrl;
            } catch (error) {
                console.error("Error getting IP camera frame:", error);
            }
        };

        getVideoStream();
        setInterval(getIPCameraFrame, 1000);

        drawFrame();

        return () => {
            videoElement.srcObject.getTracks().forEach((track) => track.stop());
            videoElement.src = "";
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default Recorder;

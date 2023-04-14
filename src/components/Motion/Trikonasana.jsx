import React, { useContext, useState } from "react";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { useRef, useEffect } from "react";
import angleBetweenThreePoints from "./angle";
import Link from "../link/Link";
import { Button } from "@mui/material";
import yoga1 from "../../assets/Trikonasana.png";
import { doc, setDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import DateContext from "../../context/date";
import dayjs from "dayjs";
import { AuthContext } from "../auth/auth";
import { db } from "../../components/auth/Firebase";
import { v4 as uuidv4 } from "uuid";

const Trikonasana = ({ handleYoga }) => {
    const [time, setTime] = useState(0);
    const [wwcoin, setWwcoin] = useState(0);

    const { date } = useContext(DateContext);
    const collectionDate = dayjs(date).format("MMMM,DD");

    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    let camera = null;

    var t = new Date().getTime();
    const getWwcoin = () => {
        setWwcoin(time / 20);
    };
    const handleClick = () => {
        const fetchData = async () => {
            try {
                const userRef = collection(db, "users");
                const userDocSnapshot = await getDocs(query(userRef, where("uid", "==", currentUserId)));
                const userDocRef = userDocSnapshot.docs[0].ref;
                const coinCollectionRef = collection(userDocRef, "WWcoin");
                const itemRef = doc(coinCollectionRef, "yoga");
                const dateCountCollectionRef = collection(itemRef, collectionDate);
                const countItem = { id: uuidv4(), yoga: "Trikonasana", time: time, points: wwcoin };
                const countItemRef = doc(dateCountCollectionRef, countItem.id);
                await setDoc(countItemRef, countItem);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        handleYoga("");
    };

    function onResult(results) {
        if (results.poseLandmarks) {
            const position = results.poseLandmarks;
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            const width = canvasRef.current.width;
            const height = canvasRef.current.height;

            // index 12,14,16 11,13,15, range 125,145
            const leftHand = [];
            const rightHand = [];
            for (let i = 11; i < 17; i++) {
                let obj = {};
                obj["x"] = position[i].x * width;
                obj["y"] = position[i].y * height;
                if (i % 2 === 0) {
                    rightHand.push(obj);
                } else {
                    leftHand.push(obj);
                }
            }

            // index 12,24,26, range 125,145
            const back = [];
            const indexBack = [12, 24, 26];
            for (let i = 0; i < 3; i++) {
                let obj = {};
                obj["x"] = position[indexBack[i]].x * width;
                obj["y"] = position[indexBack[i]].y * height;
                back.push(obj);
            }

            const angleBack = Math.round(angleBetweenThreePoints(back));
            const angleLeftHand = Math.round(angleBetweenThreePoints(leftHand));
            const angleRightHand = Math.round(angleBetweenThreePoints(rightHand));

            let inRangeBack;
            let inRangeLeftHand;
            let inRangeRightHand;
            if (angleBack >= 130 && angleBack <= 160) {
                inRangeBack = true;
            } else {
                inRangeBack = false;
            }
            if (angleLeftHand >= 165 && angleLeftHand <= 195) {
                inRangeLeftHand = true;
            } else {
                inRangeLeftHand = false;
            }
            if (angleRightHand >= 165 && angleRightHand <= 195) {
                inRangeRightHand = true;
            } else {
                inRangeRightHand = false;
            }

            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            //canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

            for (let i = 0; i < 2; i++) {
                canvasCtx.beginPath();
                canvasCtx.lineWidth = 8;

                canvasCtx.moveTo(back[i].x, back[i].y);
                canvasCtx.lineTo(back[i + 1].x, back[i + 1].y);
                if (inRangeBack) {
                    canvasCtx.strokeStyle = "green";
                } else {
                    canvasCtx.strokeStyle = "red";
                }
                canvasCtx.stroke();

                canvasCtx.beginPath();
                canvasCtx.moveTo(leftHand[i].x, leftHand[i].y);
                canvasCtx.lineTo(leftHand[i + 1].x, leftHand[i + 1].y);
                if (inRangeLeftHand) {
                    canvasCtx.strokeStyle = "green";
                } else {
                    canvasCtx.strokeStyle = "red";
                }
                canvasCtx.stroke();

                canvasCtx.beginPath();
                canvasCtx.moveTo(rightHand[i].x, rightHand[i].y);
                canvasCtx.lineTo(rightHand[i + 1].x, rightHand[i + 1].y);
                if (inRangeRightHand) {
                    canvasCtx.strokeStyle = "green";
                } else {
                    canvasCtx.strokeStyle = "red";
                }
                canvasCtx.stroke();
            }

            for (let i = 0; i < 3; i++) {
                canvasCtx.beginPath();
                //right hand
                canvasCtx.arc(rightHand[i].x, rightHand[i].y, 8, 0, Math.PI * 2);
                //left hand
                canvasCtx.arc(leftHand[i].x, leftHand[i].y, 8, 0, Math.PI * 2);
                canvasCtx.fillStyle = "#AAFF00";
                canvasCtx.fill();

                canvasCtx.beginPath();
                canvasCtx.arc(back[i].x, back[i].y, 8, 0, Math.PI * 2);
                canvasCtx.fillStyle = "#AAFF00";
                canvasCtx.fill();
            }

            if (!(inRangeBack && inRangeLeftHand && inRangeRightHand)) {
                t = new Date().getTime();
            }

            canvasCtx.font = "30px Monospace";
            canvasCtx.fillText(angleLeftHand, leftHand[1].x + 20, leftHand[1].y + 20);
            canvasCtx.fillText(angleRightHand, rightHand[1].x - 120, rightHand[1].y + 20);
            canvasCtx.fillText(angleBack, back[1].x, back[1].y + 40);

            canvasCtx.font = "30px Monospace";
            setTime(Math.round((new Date().getTime() - t) / 1000));
            canvasCtx.fillText("Seconds holded: ".concat(String(Math.round((new Date().getTime() - t) / 1000))), 10, 40);

            canvasCtx.restore();
        }
    }

    useEffect(() => {
        const pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`;
            },
        });
        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        pose.onResults(onResult);

        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await pose.send({ image: webcamRef.current.video });
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }
    });

    return (
        <div className="flex justify-center gap-10 items-center">
            <div className="flex justify-center items-center w-1/2">
                <div className="relative inline-block w-full h-full rounded-xl">
                    <Webcam ref={webcamRef} className="w-full h-full rounded-xl" />
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-xl" />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2  bg-slate-300 rounded-xl">
                <p className="text-xl font-bold mb-4 text-gray-800 transition duration-300 ease-in-out transform hover:scale-110">Try to mimic this pose</p>
                <img alt="" src={yoga1} className="w-[50%] mb-8 transition duration-300 ease-in-out transform hover:scale-105"></img>
                <Link to="/yoga">
                    <Button onClick={handleClick} size="large" variant="outlined" color="primary" className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 mb-4">
                        Done
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Trikonasana;

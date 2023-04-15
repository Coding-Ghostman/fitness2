import React, { useContext, useState } from "react";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { useRef, useEffect } from "react";
import angleBetweenThreePoints from "./angle";
import { Button } from "@mui/material";
import Link from "../link/Link";
import { doc, setDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import DateContext from "../../context/date";
import dayjs from "dayjs";
import { AuthContext } from "../auth/auth";
import { db } from "../../components/auth/Firebase";
import { v4 as uuidv4 } from "uuid";

const styles = {
    webcam: {
        position: "absolute",
        marginRight: "auto",
        marginLeft: "auto",
        left: 0,
        right: 800,
        top: 200,
        textAlign: "center",
        zIndex: 9,
        width: 960,
        height: 720,
    },
    countBox: {
        position: "absolute",
        marginRight: "auto",
        marginLeft: "auto",
        left: 1100,
        right: 0,
        top: 600,
        width: 400,
        height: 100,
    },
    selectBox: {
        position: "absolute",
        marginRight: "auto",
        marginLeft: "auto",
        left: 1000,
        right: 0,
        top: 250,
        textAlign: "center",
        width: 400,
        color: "#05386B",
        background: "#8EE4AF",
    },
    back: {
        position: "absolute",
        marginRight: "auto",
        marginLeft: "auto",
        left: 1700,
        right: 0,
        top: 850,
    },
};

const exrInfo = {
    bicepCurls: {
        index: [12, 14, 16],
        ul: 160,
        ll: 50,
    },
    squats: {
        index: [24, 26, 28],
        ul: 170,
        ll: 50,
    },
    pushups: {
        index: [12, 14, 16],
        ul: 160,
        ll: 80,
    },
    crunches: {
        index: [12, 24, 26],
        ul: 130,
        ll: 50,
    },
    pullupps: {
        index: [11, 13, 15],
        ul: 160,
        ll: 40,
    },
    legraise: {
        index: [11, 23, 25],
        ul: 150,
        ll: 90,
    },
};

let dir = 0;
let angle = 0;
function Counter({ handleWorkout, exercise, image }) {
    const [count, setCount] = useState(0);
    const [wwcoin, setWwcoin] = useState(0);

    const { date } = useContext(DateContext);
    const collectionDate = dayjs(date).format("MMMM,DD");

    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;

    let imgSource;
    if (exercise === "bicepCurls") {
        imgSource = image;
    } else if (exercise === "squats") {
        imgSource = image;
    } else if (exercise === "pushups") {
        imgSource = image;
    } else if (exercise === "crunches") {
        imgSource = image;
    }

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    let camera = null;
    const countTextbox = useRef(null);

    const getWwcoin = () => {
        if (exercise === "bicepCurls") {
            const calorie = (count / 50) * 7;
            setWwcoin(Math.floor(calorie / 10));
        } else if (exercise === "squats") {
            const calorie = (count / 50) * 8;
            setWwcoin(Math.floor(calorie / 10));
        } else if (exercise === "pushups") {
            const calorie = (count / 50) * 6;
            setWwcoin(Math.floor(calorie / 10));
        } else if (exercise === "crunches") {
            const calorie = (count / 50) * 7;
            setWwcoin(Math.floor(calorie / 10));
        }
    };

    const handleClick = () => {
        const fetchData = async () => {
            try {
                const userRef = collection(db, "users");
                const userDocSnapshot = await getDocs(query(userRef, where("uid", "==", currentUserId)));
                const userDocRef = userDocSnapshot.docs[0].ref;
                const coinCollectionRef = collection(userDocRef, "WWcoin");
                const itemRef = doc(coinCollectionRef, "workout");
                const dateCountCollectionRef = collection(itemRef, collectionDate);
                getWwcoin();
                const countItem = { id: uuidv4(), count: count, points: wwcoin };
                const countItemRef = doc(dateCountCollectionRef, countItem.id);
                console.log(countItem);
                await setDoc(countItemRef, countItem);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        handleWorkout("");
    };
    function onResult(results) {
        if (results.poseLandmarks) {
            const position = results.poseLandmarks;

            // set height and width of canvas
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            const width = canvasRef.current.width;
            const height = canvasRef.current.height;

            //ratios between 0-1, covert them to pixel positions
            const upadatedPos = [];
            const indexArray = exrInfo[exercise].index;

            for (let i = 0; i < 3; i += 1) {
                upadatedPos.push({
                    x: position[indexArray[i]].x * width,
                    y: position[indexArray[i]].y * height,
                });
            }
            //console.log(upadatedPos)
            angle = Math.round(angleBetweenThreePoints(upadatedPos));
            //console.log("Angle is getting updated ",angle)

            // Count reps
            //0 is down, 1 is up
            if (angle > exrInfo[exercise].ul) {
                //console.log("test angle ",angle)
                if (dir === 0) {
                    //count.current = count.current + 0.5
                    console.log(count, " ", dir, " decrement ", angle);
                    dir = 1;
                }
            }
            if (angle < exrInfo[exercise].ll) {
                if (dir === 1) {
                    setCount(count + 1);
                    console.log(count, " ", dir, " increment ", angle);
                    dir = 0;
                }
            }

            //console.log(count.current)
            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            canvasCtx.save();

            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            //canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

            for (let i = 0; i < 2; i++) {
                canvasCtx.beginPath();
                canvasCtx.moveTo(upadatedPos[i].x, upadatedPos[i].y);
                canvasCtx.lineTo(upadatedPos[i + 1].x, upadatedPos[i + 1].y);
                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = "white";
                canvasCtx.stroke();
            }
            for (let i = 0; i < 3; i++) {
                canvasCtx.beginPath();
                canvasCtx.arc(upadatedPos[i].x, upadatedPos[i].y, 10, 0, Math.PI * 2);
                canvasCtx.fillStyle = "#AAFF00";
                canvasCtx.fill();
            }
            canvasCtx.font = "40px aerial";
            canvasCtx.fillText(angle, upadatedPos[1].x + 10, upadatedPos[1].y + 40);
            canvasCtx.restore();
        }
    }

    useEffect(() => {
        console.log("rendered");
        dir = 0;
        //console.log(count.current)
        //console.log("rendered counter")
        const pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`;
            },
        });
        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.6,
            minTrackingConfidence: 0.5,
        });

        pose.onResults(onResult);

        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    countTextbox.current.value = count;
                    //console.log(count, dir)
                    //console.log("hello",countTextbox.current.value)
                    await pose.send({ image: webcamRef.current.video });
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }
    });
    //console.log(props)
    function resetCount() {
        console.log("clicked");
        setCount(0);
        dir = 0;
    }

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
                <img alt="" src={imgSource} className="w-[50%] mb-8 transition duration-300 ease-in-out transform hover:scale-105"></img>
                <h1>Count</h1>
                <input
                    variant="filled"
                    ref={countTextbox}
                    value={count}
                    textAlign="center"
                    className="bg-gray-100 rounded-md py-2 px-4 mb-4 text-center text-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ height: 50, fontSize: 40 }}
                />
                <div className="flex flex-row gap-8">
                    <Button
                        onClick={resetCount}
                        size="large"
                        variant="outlined"
                        color="primary"
                        className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 mb-4 py-4"
                    >
                        RESET
                    </Button>

                    <Link to="/fitness">
                        <Button
                            onClick={handleClick}
                            size="large"
                            variant="outlined"
                            color="primary"
                            className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 mb-4 py-4"
                        >
                            Done
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Counter;

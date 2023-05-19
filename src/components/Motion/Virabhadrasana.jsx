import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { useRef, useEffect, useState, useContext } from "react";
import angleBetweenThreePoints from "./angle";
import yoga1 from "../../assets/Virabhadrasana.png";
import { Button } from "@mui/material";
import Link from "../link/Link";
import LoadingAnimation from "../Animation/LoadingAnimation";
import { doc, setDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import DateContext from "../../context/date";
import dayjs from "dayjs";
import { AuthContext } from "../auth/auth";
import { db } from "../../components/auth/Firebase";
import { v4 as uuidv4 } from "uuid";

const Virabhadrasana = ({ handleYoga }) => {
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
                const countItem = { id: uuidv4(), yoga: "Virabhadrasana", time: time, points: wwcoin };
                const countItemRef = doc(dateCountCollectionRef, countItem.id);
                await setDoc(countItemRef, countItem);
            } catch (error) {
                console.log(error);
            }
        };
        if (camera) {
            camera.stop();
        }
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

            const leftHand = [];
            const rightHand = [];
            const leftLeg = [];
            const rightLeg = [];

            //index 11,13,15 left hand, angle range 165,185
            //index 12,14,16 right hand, angle range 175,195
            //index 23,25,27 left leg, angle range 245,265
            //index 24,26,28 right leg, angle range 175,200
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
            for (let i = 23; i < 29; i++) {
                let obj = {};
                obj["x"] = position[i].x * width;
                obj["y"] = position[i].y * height;
                if (i % 2 === 0) {
                    rightLeg.push(obj);
                } else {
                    leftLeg.push(obj);
                }
            }
            const leftHandAngle = Math.round(angleBetweenThreePoints(leftHand));
            const rightHandAngle = Math.round(angleBetweenThreePoints(rightHand));
            const leftLegAngle = Math.round(angleBetweenThreePoints(leftLeg));
            const rightLegAngle = Math.round(angleBetweenThreePoints(rightLeg));

            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            //canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

            let inRangeRightHand;
            if (rightHandAngle >= 170 && rightHandAngle <= 190) {
                inRangeRightHand = true;
            } else {
                inRangeRightHand = false;
            }

            let inRangeLeftHand;
            if (leftHandAngle >= 170 && leftHandAngle <= 190) {
                inRangeLeftHand = true;
            } else {
                inRangeLeftHand = false;
            }

            let inRangeRightLeg;
            if (rightLegAngle >= 170 && rightLegAngle <= 190) {
                inRangeRightLeg = true;
            } else {
                inRangeRightLeg = false;
            }

            let inRangeLeftLeg;
            if (leftLegAngle >= 100 && leftLegAngle <= 120) {
                inRangeLeftLeg = true;
            } else {
                inRangeLeftLeg = false;
            }

            for (let i = 0; i < 2; i++) {
                canvasCtx.beginPath();
                canvasCtx.lineWidth = 8;

                //right hand
                canvasCtx.moveTo(rightHand[i].x, rightHand[i].y);
                canvasCtx.lineTo(rightHand[i + 1].x, rightHand[i + 1].y);
                if (inRangeRightHand) {
                    canvasCtx.strokeStyle = "green";
                } else {
                    canvasCtx.strokeStyle = "red";
                }
                canvasCtx.stroke();

                //lefthand
                canvasCtx.beginPath();
                canvasCtx.moveTo(leftHand[i].x, leftHand[i].y);
                canvasCtx.lineTo(leftHand[i + 1].x, leftHand[i + 1].y);
                if (inRangeLeftHand) {
                    canvasCtx.strokeStyle = "green";
                } else {
                    canvasCtx.strokeStyle = "red";
                }
                canvasCtx.stroke();

                //right leg
                canvasCtx.beginPath();
                canvasCtx.moveTo(rightLeg[i].x, rightLeg[i].y);
                canvasCtx.lineTo(rightLeg[i + 1].x, rightLeg[i + 1].y);
                if (inRangeRightLeg) {
                    canvasCtx.strokeStyle = "green";
                } else {
                    canvasCtx.strokeStyle = "red";
                }
                canvasCtx.stroke();

                //left leg
                canvasCtx.beginPath();
                canvasCtx.moveTo(leftLeg[i].x, leftLeg[i].y);
                canvasCtx.lineTo(leftLeg[i + 1].x, leftLeg[i + 1].y);
                if (inRangeLeftLeg) {
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
                //right leg
                canvasCtx.arc(rightLeg[i].x, rightLeg[i].y, 8, 0, Math.PI * 2);
                //left leg
                canvasCtx.arc(leftLeg[i].x, leftLeg[i].y, 8, 0, Math.PI * 2);

                canvasCtx.fillStyle = "#AAFF00";
                canvasCtx.fill();
            }

            if (!(inRangeRightLeg && inRangeLeftLeg && inRangeLeftHand && inRangeRightHand)) {
                t = new Date().getTime();
            }

            canvasCtx.font = "30px Monospace";
            canvasCtx.fillText(leftHandAngle, leftHand[1].x + 20, leftHand[1].y + 20);
            canvasCtx.fillText(rightHandAngle, rightHand[1].x - 120, rightHand[1].y + 20);
            canvasCtx.fillText(leftLegAngle, leftLeg[1].x + 20, leftLeg[1].y + 20);
            canvasCtx.fillText(rightLegAngle, rightLeg[1].x - 120, rightLeg[1].y + 20);

            canvasCtx.fillStyle = "black";
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
        return () => {
            if (camera) {
                console.log("Watchuing you");
                camera.stop();
            }
        };
    }, []);

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

export default Virabhadrasana;

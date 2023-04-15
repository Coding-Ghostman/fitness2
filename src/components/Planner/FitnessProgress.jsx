import sunset from "../../assets/sunset.png";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import calorie from "../../assets/calorie.png";
import "./Panel.css";
import { useContext, useEffect, useState } from "react";
import DateContext from "../../context/date";
import dayjs from "dayjs";
import { AuthContext } from "../auth/auth";
import { doc, setDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db } from "../../components/auth/Firebase";
import { v4 as uuidv4 } from "uuid";

function FitnessProgress({ MEALS }) {
    const { date } = useContext(DateContext);
    const collectionDate = dayjs(date).format("MMMM,DD");
    const [items, setItems] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;
    useEffect(() => {
        setItems([]);
        let newItems = [];
        const fetchData = async () => {
            try {
                // Get the collection reference using the current user ID and the current date
                const userRef = collection(db, "users");
                const userDocSnapshot = await getDocs(query(userRef, where("uid", "==", currentUserId)));
                if (!userDocSnapshot.empty) {
                    const userDocRef = userDocSnapshot.docs[0].ref;
                    const collectionRef = collection(userDocRef, "date-" + dayjs(date).format("MMMM,DD"));
                    // Get the subcollection documents
                    const subDocsSnapshot = await getDocs(collectionRef);
                    subDocsSnapshot.forEach((doc) => {
                        if (doc.exists()) {
                            const subDocData = doc.data();
                            newItems = [...newItems, subDocData];

                            console.log("Here");
                            // console.log(filteredItems[filteredItems.findIndex((item) => item.id === subDocData.id)]);
                        } else {
                            console.log("Subdocument does not exist!");
                        }
                    });
                    setItems(newItems);
                } else {
                    console.log("No documents match the query!");
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [date, currentUserId]);

    const mealsMap = {
        1: "Morning",
        2: "Afternoon",
        3: "Evening",
        4: "Night",
    };

    // Sum up ExpectedkcalLost for each meal type
    const mealsTotal = items.reduce((totals, workout) => {
        const meal = mealsMap[workout.meal];
        totals[meal] = (totals[meal] || 0) + parseInt(workout.ExpectedkcalLost);
        return totals;
    }, {});
    return (
        <div className="lg:text-4xl lg:font-bold md:text-3xl sm:font-[600] md:font-[800] sm:text-3xl text-2xl w-full text-white flex flex-col gap-4 mt-20 ml-8 lg:ml-12 ">
            <div>
                <p className="cursor-default">Fitness Progress Report</p>
            </div>
            <div className="flex flex-col gap-4">
                {MEALS.map((meal, index) => (
                    <div className="flex flex-row gap-4 w-[80%]">
                        <div className="flex bg_panel items-center justify-center rounded-[50%] mt-2 h-12 w-12">
                            {meal.id === "1" ? (
                                <WbTwilightRoundedIcon fontSize="medium" className="-mt-1" />
                            ) : meal.id === "2" ? (
                                <WbSunnyRoundedIcon fontSize="medium" className="" />
                            ) : meal.id === "3" ? (
                                <img className=" w-6 h-6" alt="" src={sunset} />
                            ) : (
                                <DarkModeRoundedIcon fontSize="medium" className="" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <p className="text-2xl">{meal.name}</p>
                            <p className="text-lg">{meal.time}</p>
                        </div>
                        <div className="flex flex-row justify-center items-center ml-auto mt-1">
                            <p className="text-2xl ">
                                <>
                                    {meal.name === "Morning" ? (
                                        <div>{mealsTotal.Morning}</div>
                                    ) : meal.name === "Afternoon" ? (
                                        <div>{mealsTotal.Afternoon}</div>
                                    ) : meal.name === "Evening" ? (
                                        <div>{mealsTotal.Evening}</div>
                                    ) : (
                                        <div>{mealsTotal.Night}</div>
                                    )}
                                </>
                            </p>
                            <img className="w-8 h-8" alt="" src={calorie} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FitnessProgress;

import { useContext, useEffect, useState } from "react";
import DateSelect from "../components/Planner/DateSelect";
import NavigateDateLeft from "../components/Planner/NavigateDateLeft";
import NavigateDateRight from "../components/Planner/NavigateDateRight";
import DateContext from "../context/date";
import dayjs from "dayjs";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import sunset from "../assets/sunset.png";
import calorie from "../assets/calorie.png";
import ReportCard from "../components/Card/MealCard";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { AuthContext } from "../components/auth/auth";
import { db } from "../components/auth/Firebase";
import FitnessCard from "../components/Card/FitnessCard";

function ProgressPage() {
    const { date, MEALS, setDate } = useContext(DateContext);
    const collectionDate = dayjs(date).format("MMMM,DD");
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;

    const [items, setItems] = useState([]);
    const [docRef, setDocRef] = useState(null);
    const [collectionRef, setCollectionRef] = useState(null);

    const handleNextDay = () => {
        const nextDay = dayjs(date).add(1, "day");
        setDate(nextDay);
    };

    // function to handle going to the previous day
    const handlePrevDay = () => {
        const prevDay = dayjs(date).subtract(1, "day");
        setDate(prevDay);
    };

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
                    const collectionRef = collection(userDocRef, dayjs(date).format("MMMM,DD"));
                    const subDocsSnapshot = await getDocs(collectionRef);
                    subDocsSnapshot.forEach((doc) => {
                        if (doc.exists()) {
                            const subDocData = doc.data();
                            newItems = [...newItems, subDocData];
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
    return (
        <div className="m-0 overflow-auto bg-gradient h-screen">
            <div className="rounded-full flex flex-row items-center justify-evenly ml-12 mr-12 h-[80px] shadow_navigator mt-6 gap-[20rem]">
                <div className="-mt-2">
                    <NavigateDateLeft handlePrev={handlePrevDay} />
                </div>
                <div className="">
                    <DateSelect updatedDate={date} handleDate={setDate} />
                </div>
                <div className="-mt-2">
                    <NavigateDateRight handleNext={handleNextDay} />
                </div>
            </div>
            <div>
                <div className="flex items-center justify-center text-2xl font-bold text-white mt-[30px] mb-[30px]">Fitness Plan</div>
                <div className="flex flex-row gap-1 items-center justify-center mx-auto">
                    <FitnessCard meals={MEALS} items={items} />
                </div>
            </div>
        </div>
    );
}

export default ProgressPage;

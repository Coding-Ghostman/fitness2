import { useContext, useEffect, useState } from "react";
import DateSelect from "../components/Planner/DateSelect";
import NavigateDateLeft from "../components/Planner/NavigateDateLeft";
import NavigateDateRight from "../components/Planner/NavigateDateRight";
import DateContext from "../context/date";
import dayjs from "dayjs";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../components/auth/auth";
import { db } from "../components/auth/Firebase";
import FitnessCard from "../components/Card/FitnessCard";
import MealCard from "../components/Card/MealCard";
import SignInAnimation from "../components/Animation/NotSIgnInAnimation";
import WorkoutCard from "../components/Card/WorkoutCard";
import YogaCard from "../components/Card/YogaCard";

function ProgressPage() {
    const { date, MEALS, setDate } = useContext(DateContext);
    const collectionDate = dayjs(date).format("MMMM,DD");
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;

    const [fitnessItems, setFitnessItems] = useState([]);
    const [mealItems, setMealItems] = useState([]);
    const [workout,setWorkout] = useState([]);
    const [yoga,setYoga] = useState([]);

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
        setFitnessItems([]);
        setMealItems([]);
        let newFitnessItems = [];
        let newMealItems = [];
        let newWorkoutItems = [];
        let newYogaItems = [];
        const fetchData = async () => {
            try {
                // Get the collection reference using the current user ID and the current date
                const userRef = collection(db, "users");
                const userDocSnapshot = await getDocs(query(userRef, where("uid", "==", currentUserId)));
                if (!userDocSnapshot.empty) {
                    const userDocRef = userDocSnapshot.docs[0].ref;

                    const dateCollectionRef = collection(userDocRef, "date-" + dayjs(date).format("MMMM,DD"));
                    const subDateDocsSnapshot = await getDocs(dateCollectionRef);

                    const mealCollectionRef = collection(userDocRef, "meal-" + dayjs(date).format("MMMM,DD"));
                    const subMealDocsSnapshot = await getDocs(mealCollectionRef);

                    const coinCollectionRef = collection(userDocRef, "WWcoin");
                    const workoutItemRef = doc(coinCollectionRef, "workout");
                    const workoutDateRef = collection(workoutItemRef, collectionDate);
                    const workoutDocsSnapshot = await getDocs(workoutDateRef);

                    const yogaItemRef = doc(coinCollectionRef, "yoga");
                    const yogaDateRef = collection(yogaItemRef, collectionDate);
                    const yogaDocsSnapshot = await getDocs(yogaDateRef);

                    workoutDocsSnapshot.forEach((doc) => {
                        if (doc.exists()){
                            const subdocData = doc.data();
                            newWorkoutItems = [...newWorkoutItems, subdocData]
                        }
                    })

                    yogaDocsSnapshot.forEach((doc) => {
                        if (doc.exists()){
                            const subdocData = doc.data();
                            newYogaItems = [...newYogaItems, subdocData]
                        }
                    })

                    subDateDocsSnapshot.forEach((doc) => {
                        if (doc.exists()) {
                            const subDocData = doc.data();
                            newFitnessItems = [...newFitnessItems, subDocData];
                        } else {
                            console.log("Subdocument does not exist!");
                        }
                    });

                    subMealDocsSnapshot.forEach((doc) => {
                        if (doc.exists()) {
                            const subDocData = doc.data();
                            console.log(subDocData);
                            newMealItems = [...newMealItems, subDocData];
                        } else {
                            console.log("Subdocument does not exist!");
                        }
                    });
                    setFitnessItems(newFitnessItems);
                    setMealItems(newMealItems);
                    setWorkout(newWorkoutItems);
                    setYoga(newYogaItems);
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
        <div>
            {currentUser ? (
                <div className="m-0 overflow-auto bg-[#082028] h-screen">
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
                            <FitnessCard items={fitnessItems} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center text-2xl font-bold text-white mt-[30px] mb-[30px]">Meal Plan</div>
                        <div className="flex flex-row gap-1 items-center justify-center mx-auto">
                            <MealCard MEALS = {MEALS} items={mealItems} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[50px]">
                    <div>
                        <div className="flex items-center justify-center text-2xl font-bold text-white mt-[30px] mb-[30px]">
                            Workout
                        </div>
                        <div className="flex flex-row gap-[50px] items-center justify-center mx-auto">
                            <WorkoutCard items = {workout}/>
                        </div>
                    </div>
                    <div className="-mt-[30px]">
                        <div className="flex items-center justify-center text-2xl font-bold text-white mt-[30px] mb-[30px]">
                            Yoga
                        </div>
                        <div className="flex flex-row gap-[50px] items-center justify-center mx-auto">
                            <YogaCard items = {yoga}/>
                            
                        </div>
                    </div>
                    </div>
                    
                </div>
            ) : (
                <SignInAnimation />
            )}
        </div>
    );
}

export default ProgressPage;

import { useState } from "react";
import dayjs from "dayjs";
import "./Page.css";
import DateContext from "../context/date";
import Panel from "../components/Planner/Panel";
import MealPlanner from "../components/Planner/MealPlanner";

const MEALS = [
    { id: "1", name: "Breakfast", time: "08:30 AM" },
    { id: "2", name: "Lunch", time: "12:30 PM" },
    { id: "3", name: "Snacks", time: "4:30 PM" },
    { id: "4", name: "Dinner", time: "8:30 PM" },
];

function DietPlanPage() {
    const [date, setDate] = useState(dayjs());

    return (
        <DateContext.Provider value={{ date, setDate, MEALS }}>
            <div className="">
                <div className="diet flex-1 flex">
                    <div className="article-content article-section flex-1">
                        {/* <Planner /> */}
                        <MealPlanner />
                    </div>
                    <div className="article-panel article-section ">
                        <Panel />
                    </div>
                </div>
            </div>
        </DateContext.Provider>
    );
}
export default DietPlanPage;

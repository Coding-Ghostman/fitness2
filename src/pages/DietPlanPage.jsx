import Panel from "../components/Planner/Panel";
import DateContext from "../context/date";
import { useState } from "react";
import dayjs from "dayjs";
import "./Page.css";
import Planner from "../components/Planner/Planner";
import MealPlanner from "../components/Planner/MealPlanner";
import TodoList from "../components/Planner/TodoList";

function DietPlanPage() {
    const [date, setDate] = useState(dayjs());

    return (
        <DateContext.Provider value={{ date, setDate }}>
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

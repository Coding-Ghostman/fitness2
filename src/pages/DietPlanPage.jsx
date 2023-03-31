import Panel from "../components/Planner/Panel";
import DateContext from "../context/date";
import { useState } from "react";
import dayjs from "dayjs";
import "./Page.css";

function DietPlanPage() {
    const [date, setDate] = useState(dayjs());

    return (
        <DateContext.Provider value={{ date, setDate }}>
            <div className="">
                <div className="diet flex-1 flex">
                    <div className="article-content article-section flex-1"></div>
                    <div className="article-panel article-section ">
                        <Panel />
                    </div>
                </div>
            </div>
        </DateContext.Provider>
    );
}
export default DietPlanPage;

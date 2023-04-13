import { useContext, useState } from "react";
import dayjs from "dayjs";
import "./Page.css";
import DateContext from "../context/date";
import Panel from "../components/Planner/Panel";
import FitnessPlanner from "../components/Planner/FitnessPlanner";
import { AuthContext } from "../components/auth/auth";
import SignInAnimation from "../components/Animation/NotSIgnInAnimation";

const MEALS = [
    { id: "1", name: "Morning", time: "08:30 AM" },
    { id: "2", name: "Afternoon", time: "12:30 PM" },
    { id: "3", name: "Evening", time: "5:30 PM" },
    { id: "4", name: "Night", time: "9:30 PM" },
];

function DietPlanPage() {
    const [date, setDate] = useState(dayjs());
    const { currentUser } = useContext(AuthContext);
    return (
        <div>
            {currentUser ? (
                <DateContext.Provider value={{ date, setDate, MEALS }}>
                    <div className="overflow-y-auto">
                        <div className="diet flex lg:flex-row flex-col">
                            <div className="article-panel article-section ">
                                <Panel />
                            </div>
                            <div className="article-content article-section flex-1 ">
                                <FitnessPlanner />
                            </div>
                        </div>
                    </div>
                </DateContext.Provider>
            ) : (
                <SignInAnimation />
            )}
        </div>
    );
}
export default DietPlanPage;

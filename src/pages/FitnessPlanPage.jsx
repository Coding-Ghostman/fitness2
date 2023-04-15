import { useContext, useState } from "react";
import "./Page.css";
import FitnessPlanner from "../components/Planner/FitnessPlanner";
import { AuthContext } from "../components/auth/auth";
import SignInAnimation from "../components/Animation/NotSIgnInAnimation";
import FitnessPanel from "../components/Planner/FitnessPanel";

const MEALS = [
    { id: "1", name: "Morning", time: "08:30 AM" },
    { id: "2", name: "Afternoon", time: "12:30 PM" },
    { id: "3", name: "Evening", time: "5:30 PM" },
    { id: "4", name: "Night", time: "9:30 PM" },
];

function DietPlanPage() {
    const { currentUser } = useContext(AuthContext);
    return (
        <div>
            {currentUser ? (
                <div className="overflow-y-auto">
                    <div className="diet flex lg:flex-row flex-col">
                        <div className="article-panel article-section ">
                            <FitnessPanel MEALS={MEALS} />
                        </div>
                        <div className="article-content article-section flex-1 ">
                            <FitnessPlanner MEALS={MEALS} />
                        </div>
                    </div>
                </div>
            ) : (
                <SignInAnimation />
            )}
        </div>
    );
}
export default DietPlanPage;

import "./Page.css";
import Panel from "../components/Planner/Panel";
import MealPlanner from "../components/Planner/MealPlanner";

function DietPlanPage() {
    return (
        <div className="">
            <div className="diet flex lg:flex-row flex-col">
                <div className="article-panel article-section ">
                    <Panel />
                </div>
                <div className="article-content article-section flex-1">
                    <MealPlanner />
                </div>
            </div>
        </div>
    );
}
export default DietPlanPage;

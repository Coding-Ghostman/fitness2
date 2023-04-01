import { Select, Radio } from "antd";
import { useState, useContext } from "react";
import DateContext from "../../context/date";
import dayjs from "dayjs";

function Planner() {
    const { date } = useContext(DateContext);
    const [meals, setMeals] = useState({
        breakfast: [{ value: "eggs", label: "eggs" }],
        lunch: [],
        supper: [],
        snack: [],
    });
    const handleChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <div className="text-white rounded-lg flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mt-6 cursor-default select-none">{dayjs(date).format("dddd")}</h2>
            <div className="mt-6 flex flex-col">
                <div className="flex flex-row gap-10">
                    <div className="flex flex-col">
                        <p className="text-sm -mb-2 text-gray-500 font-normal">8:30</p>
                        <p className="m-auto text-lg font-bold">Breakfast</p>
                    </div>
                    <Select mode="multiple" size="large" placeholder="Select a Meal" options={meals.breakfast} style={{ width: "400px" }} onChange={handleChange} />
                </div>
                <div>
                    <p>Lunch</p>
                    <Select mode="multiple" size="large" placeholder="Select a Meal" style={{ width: "400px" }} />
                </div>
                <div>
                    <p>Snacks</p>
                    <Select mode="multiple" size="large" placeholder="Select a Meal" style={{ width: "400px" }} />
                </div>
                <div>
                    <p>Supper</p>
                    <Select mode="multiple" size="large" placeholder="Select a Meal" style={{ width: "400px" }} />
                </div>
            </div>
        </div>
    );
}
export default Planner;

/*

*/

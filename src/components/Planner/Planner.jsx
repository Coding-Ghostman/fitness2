import { Select, Radio } from "antd";
import { useState, useContext } from "react";
import DateContext from "../../context/date";
import dayjs from "dayjs";

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

function Planner() {
    const { date } = useContext(DateContext);
    const [meals, setMeals] = useState({
        breakfast: [],
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
            <div className="mt-6">
                <div>
                    <p>Breakfast</p>
                    <Select mode="multiple" size="large" placeholder="Select a Meal" options={options} style={{ width: "400px" }} onChange={handleChange} />
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

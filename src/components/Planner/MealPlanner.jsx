import { useState, useContext } from "react";
import DateContext from "../../context/date";
import dayjs from "dayjs";

function MealPlanner() {
    const { date, setDate } = useContext(DateContext);
    const [meals, setMeals] = useState([
        { id: 1, text: "Omelette" },
        { id: 2, text: "Grilled chicken" },
        { id: 3, text: "Vegetable stir-fry" },
    ]);
    const [newMeal, setNewMeal] = useState("");

    function handleNewMealChange(event) {
        setNewMeal(event.target.value);
    }

    function handleAddMeal() {
        if (newMeal !== "") {
            setMeals([
                ...meals,
                {
                    id: meals.length + 1,
                    text: newMeal,
                },
            ]);
            setNewMeal("");
        }
    }

    function handleDeleteMeal(id) {
        setMeals(meals.filter((meal) => meal.id !== id));
    }

    return (
        <div className="text-white rounded">
            <h2 className="flex text-3xl w-full mt-6 font-bold cursor-default justify-center items-center select-none">{dayjs(date).format("dddd")}</h2>

            <div className="max-w-xl mx-auto mt-10">
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Enter a new meal"
                        value={newMeal}
                        onChange={handleNewMealChange}
                        className="border text-neutral-900 rounded-l-lg px-4 py-2 w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button onClick={handleAddMeal} className="bg-blue-600 text-white rounded-r-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                        Add
                    </button>
                </div>
                <ul>
                    {meals.map((meal) => (
                        <li key={meal.id} className="flex justify-between items-center py-2 border-b">
                            <span>{meal.text}</span>
                            <button onClick={() => handleDeleteMeal(meal.id)} className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MealPlanner;

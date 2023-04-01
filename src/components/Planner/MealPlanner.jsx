import { useState, useContext } from "react";
import DateContext from "../../context/date";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";


const MEALS = [
    { id: uuidv4(), name: "Breakfast" },
    { id: uuidv4(), name: "Lunch" },
    { id: uuidv4(), name: "Dinner" },
];


const ITEMS = [
    { id: uuidv4(), name: "Chicken Parmesan", meal: MEALS[0].id },
    { id: uuidv4(), name: "Spaghetti and Meatballs", meal: MEALS[1].id },
    { id: uuidv4(), name: "Grilled Cheese Sandwich", meal: MEALS[1].id },
    { id: uuidv4(), name: "Chicken Caesar Salad", meal: MEALS[2].id },
];

const MealPlanner = () => {
    const [items, setItems] = useState(ITEMS);
    const { date } = useContext(DateContext);

    // const onDragEnd = (result) => {
    //     if (!result.destination) {
    //         return;
    //     }

    //     const newItems = Array.from(items);
    //     const [reorderedItem] = newItems.splice(result.source.index, 1);
    //     // newItems.splice(result.destination.index, 0, reorderedItem);
    //     newItems.splice(result.destination.index, 0, {
    //         ...reorderedItem,
    //         meal: MEALS[result.destination.droppableId].id,
    //     });

    //     setItems(newItems);
    // };
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            // If item is dragged within the same droppable section, no need to update the meal value
            return;
        }

        const newItems = items.map((item) => {
            if (item.id === result.draggableId) {
                // If the dragged item matches the current item being looped over, update its meal value
                return {
                    ...item,
                    meal: MEALS.find((meal) => meal.id === destination.droppableId).id,
                };
            }
            return item;
        });

        setItems(newItems);
    };

    const handleNameChange = (id, newName) => {
        const newItems = [...items];
        const index = newItems.findIndex((item) => item.id === id);
        newItems[index].name = newName;
        setItems(newItems);
    };

    return (
        <div className="bg-white p-4">
            <h2 className="text-3xl font-bold mt-6 cursor-default select-none">{dayjs(date).format("dddd")}</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                {MEALS.map((meal) => (
                    <div key={meal.id}>
                        <h3 className="text-lg font-bold mb-2">{meal.name}</h3>
                        <Droppable droppableId={meal.id}>
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef} className="bg-gray-100 rounded p-2">
                                    {items.map((item, index) => {
                                        if (item.meal === meal.id) {
                                            return (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided) => (
                                                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="bg-white rounded p-2 mb-2">
                                                            <input type="text" value={item.name} onChange={(e) => handleNameChange(item.id, e.target.value)} />
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                        <button
                            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-300"
                            onClick={() => {
                                const newItem = {
                                    id: uuidv4(),
                                    name: "New Item",
                                    meal: meal.id,
                                };
                                setItems([...items, newItem]);
                            }}
                        >
                            <AddIcon className="h-6 w-6 mr-2" />
                            <span>Add item</span>
                        </button>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
};

export default MealPlanner;

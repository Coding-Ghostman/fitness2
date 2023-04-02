import { useState, useEffect, Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddIcon from "@mui/icons-material/Add";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { v4 as uuidv4 } from "uuid";
import { Divider } from "@mui/material";

const MEALS = [
    { id: "1", name: "Breakfast" },
    { id: "2", name: "Lunch" },
    { id: "3", name: "Dinner" },
];

let menuItems = [
    { id: "10", name: "Chicken ", meal: MEALS[0].id, added: false },
    { id: "20", name: "Spaghetti", meal: MEALS[0].id, added: false },
    { id: "30", name: "Grilled ", meal: MEALS[1].id, added: false },
    { id: "40", name: "Chicken ", meal: MEALS[2].id, added: false },
];

const MealPlanner = () => {
    const [items, setItems] = useState([]);
    // const [menuItems, setMenu]
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e) => {
        const found = items.find((item) => item.added === false);
        console.log(found);
        if (found) {
            const index = items.findIndex((item) => item.id === e);
            menuItems = [...menuItems, items[index]];

            const newItems = items.filter((item) => item.id !== e);
            console.log(newItems);
            setItems(newItems);
        } else {
            const newItems = items.filter((item) => item.id !== e);
            console.log(newItems);
            setItems(newItems);
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const sourceMealId = result.source.droppableId;
        const destinationMealId = result.destination.droppableId;

        if (sourceMealId !== destinationMealId) {
            if (sourceMealId === "menuItems") {
                const dragObj = result.draggableId;
                const newItems = [...items, menuItems.find((item) => item.id === dragObj)];
                newItems[newItems.findIndex((item) => item.id === dragObj)].meal = destinationMealId;

                const index = menuItems.findIndex((item) => item.id === dragObj);

                // check if the object exists
                if (index !== -1) {
                    // remove the object
                    menuItems.splice(index, 1);
                }
                setItems(newItems);
            } else {
                const newItems = Array.from(items);
                const [reorderedItem] = newItems.splice(result.source.index, 1);
                // Update the meal value of the reordered item
                reorderedItem.meal = destinationMealId || "";

                newItems.splice(result.destination.index, 0, reorderedItem);
                setItems(newItems);
            }
        } else {
            const newItems = Array.from(items);
            const [reorderedItem] = newItems.splice(result.source.index, 1);
            newItems.splice(result.destination.index, 0, reorderedItem);
            setItems(newItems);
        }
    };

    return (
        <div className="bg-white p-4">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-row">
                    <div>
                        {MEALS.map((meal) => (
                            <div className="flex flex-row w-[50%] " key={meal.id}>
                                <div className="flex flex-col mt-7 w-[20%]">
                                    <div className="text-sm -mb-2 text-gray-500 font-normal">8:30</div>
                                    <div className="text-lg font-bold">{meal.name}</div>
                                </div>
                                {
                                    <div className="flex flex-col items-center justify-center ml-[40px]">
                                        <Droppable droppableId={meal.id}>
                                            {(provided) => (
                                                <>
                                                    <div {...provided.droppableProps} ref={provided.innerRef} className="bg-gray-100 mt-6  rounded-xl p-2 ml-[50%] w-[200px] min-h-[50px] h-auto">
                                                        {items.length > 0 &&
                                                            items.map((item, index) => {
                                                                if (item.meal === meal.id) {
                                                                    return (
                                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                            {(provided) => (
                                                                                <div
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    ref={provided.innerRef}
                                                                                    className="bg-white p-1 flex flex-row mb-2 mt-2"
                                                                                >
                                                                                    {item.name}
                                                                                    <ClearRoundedIcon
                                                                                        onClick={() => {
                                                                                            handleClick(item.id);
                                                                                        }}
                                                                                        className="ml-auto"
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    );
                                                                } else {
                                                                    return null;
                                                                }
                                                            })}
                                                        {provided.placeholder}
                                                    </div>
                                                </>
                                            )}
                                        </Droppable>
                                        <button
                                            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                            onClick={() => {
                                                const newItem = {
                                                    id: uuidv4(),
                                                    name: "Item added",
                                                    meal: meal.id,
                                                    added: true,
                                                };
                                                setItems([...items, newItem]);
                                            }}
                                        >
                                            <AddIcon className="h-6 w-6 mr-2" />
                                            <span>Add item</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    <Divider sx={{ marginLeft: "auto", marginRight: "70px" }} orientation="vertical" variant="middle" flexItem />
                    <div className="mr-[60px] mt-2">
                        <button type="button" className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl inline-flex items-center" onClick={() => setIsOpen(!isOpen)}>
                            <span className="mr-2">{"Select an item"}</span>
                            <svg className={`fill-current h-4 w-4 ${isOpen ? "-rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M6 8l4 4 4-4"></path>
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="absolute z-10 mt-1 w-[15%] bg-white rounded-md shadow-lg">
                                <Droppable droppableId="menuItems">
                                    {(provided) => (
                                        <ul className="py-2" {...provided.droppableProps} ref={provided.innerRef}>
                                            {menuItems.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided) => (
                                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="bg-white rounded p-2 mb-2">
                                                            {item.name}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </div>
                        )}
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};

export default MealPlanner;

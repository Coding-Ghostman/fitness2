import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const items = [
    { id: "item1", label: "Item 1" },
    { id: "item2", label: "Item 2" },
    { id: "item3", label: "Item 3" },
    { id: "item4", label: "Item 4" },
    { id: "item5", label: "Item 5" },
];
const SearchDropdown = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);

        setSelectedItem(newItems.indexOf(selectedItem) !== -1 ? selectedItem : null);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button type="button" className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center" onClick={() => setIsOpen(!isOpen)}>
                <span className="mr-2">{selectedItem ? selectedItem.label : "Select an item"}</span>
                <svg className={`fill-current h-4 w-4 ${isOpen ? "-rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M6 8l4 4 4-4"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="items">
                            {(provided) => (
                                <ul className="py-2" {...provided.droppableProps} ref={provided.innerRef}>
                                    {items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <li
                                                    className={`${selectedItem === item ? "bg-blue-500 text-white" : "bg-white text-gray-900"} hover:bg-gray-100 cursor-pointer py-2 px-4`}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    onClick={() => handleItemClick(item)}
                                                >
                                                    {item.label}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
        </div>
    );
};

export default SearchDropdown;

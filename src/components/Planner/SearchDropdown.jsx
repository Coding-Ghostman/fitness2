import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const items = ["Apple", "Banana", "Cherry", "Durian", "Elderberry", "Fig", "Grape"];
const DraggableDropDown = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredItems = items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setSelectedItem(null);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setSearchTerm("");
    };

    return (
        <div className="relative">
            <input type="text" placeholder="Search..." className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500" value={searchTerm} onChange={handleSearch} />
            {filteredItems.length > 0 && (
                <Droppable droppableId="items">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="absolute w-full mt-1 bg-white shadow-lg rounded-md overflow-y-auto max-h-48">
                            {filteredItems.map((item, index) => (
                                <Draggable key={item} draggableId={item} index={index}>
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className={`p-2 hover:bg-gray-100 ${selectedItem === item ? "bg-blue-200" : ""}`}
                                            onClick={() => handleSelectItem(item)}
                                        >
                                            {item}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )}
        </div>
    );
};

export default DraggableDropDown;

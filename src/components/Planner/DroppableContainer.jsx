import { Droppable, Draggable } from "react-beautiful-dnd";

const DroppableContainer = ({ items, droppableId, button }) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1 min-h-0 overflow-auto px-4 py-2 bg-gray-100 rounded-md">
                    {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white rounded-md p-4 my-2 shadow-md">
                                    {item.content}
                                    {button && (
                                        <button
                                            onClick={() => console.log(`Clicked ${item.content}`)}
                                            className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                        >
                                            Click me
                                        </button>
                                    )}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DroppableContainer;

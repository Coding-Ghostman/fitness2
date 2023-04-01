import React, { useState } from "react";
import tw from "tailwind-styled-components";

const TodoListContainer = tw.div`
  w-full
  max-w-md
  mx-auto
  bg-white
  rounded-md
  shadow-md
  p-4
`;

const TodoItemContainer = tw.div`
  flex
  items-center
  justify-between
  p-2
  border-b-2
  border-gray-100
`;

const TodoItemTitle = tw.span`
  text-lg
`;

const TodoItemButton = tw.button`
  ml-2
  bg-red-500
  hover:bg-red-600
  text-white
  font-bold
  py-1
  px-2
  rounded-md
`;

const TodoList = () => {
    const [todoList, setTodoList] = useState([
        { id: 1, title: "Learn React", completed: true },
        { id: 2, title: "Build a project using React", completed: false },
        { id: 3, title: "Deploy the project to a web server", completed: false },
    ]);

    const [newTodoTitle, setNewTodoTitle] = useState("");

    const handleToggleTodo = (todoId) => {
        const updatedTodoList = todoList.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodoList(updatedTodoList);
    };

    const handleDeleteTodo = (todoId) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== todoId);
        setTodoList(updatedTodoList);
    };

    const handleNewTodoSubmit = (event) => {
        event.preventDefault();
        const newTodo = { id: Date.now(), title: newTodoTitle, completed: false };
        setTodoList([...todoList, newTodo]);
        setNewTodoTitle("");
    };

    return (
        <TodoListContainer>
            {todoList.map((todo) => (
                <TodoItemContainer key={todo.id}>
                    <TodoItemTitle>{todo.title}</TodoItemTitle>
                    <div>
                        <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
                        <TodoItemButton onClick={() => handleDeleteTodo(todo.id)}>Delete</TodoItemButton>
                    </div>
                </TodoItemContainer>
            ))}
            <form onSubmit={handleNewTodoSubmit}>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(event) => setNewTodoTitle(event.target.value)}
                    placeholder="Add a new todo"
                    className="border border-gray-300 p-2 mt-4 rounded-md w-full"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4">
                    Add Todo
                </button>
            </form>
        </TodoListContainer>
    );
};

export default TodoList;

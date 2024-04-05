import React from 'react';
import useLocalStorage from './useLocalStorage';

export const useTodo = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentTodo, setCurrentTodo] = React.useState([]);

  function handleFormSubmit(event, task, validate) {
    event.preventDefault();
    if (validate(task)) {
      if (isEditing) {
        const updatedTodos = todos.map((todo) =>
          todo.id === currentTodo.id ? { ...currentTodo, text: task } : todo,
        );
        setTodos(updatedTodos);
        setIsEditing(false);
      } else {
        setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
      }
    }
  }

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setIsEditing(true);
    setCurrentTodo(todos[index]);
  };

  return {
    todos,
    isEditing,
    currentTodo,
    handleFormSubmit,
    toggleTodo,
    removeTodo,
    editTodo,
    setTodos,
    setIsEditing,
    setCurrentTodo,
  };
};

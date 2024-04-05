import React from 'react';
import './assets/Styles/global.css';
import styles from './App.module.css';
import Input from './components/Input';
import Edit from './assets/images/edit.svg?react';
import Trash from './assets/images/trash.svg?react';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [task, setTask] = React.useState('');
  const [error, setError] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentTodo, setCurrentTodo] = React.useState([]);

  function validate(value) {
    if (value.length === 0) {
      setError('Fill in a value');
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function handleChange({ target }) {
    if (error) validate(target.value);
    setTask(target.value);
  }

  function handleBlur({ target }) {
    validate(target.value);
  }

  function handleFormSubmit(event) {
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
      setTask('');
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
    setTask(todos[index].text);
    setIsEditing(true);
    setCurrentTodo(todos[index]);
  };

  return (
    <div className={styles.container}>
      <h1>my task list</h1>
      <form action="#" className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.inputControl}>
          <Input
            type="text"
            value={task}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="ENTER TASK"
          />
          <button type="submit">{isEditing ? 'x' : '+'}</button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <ul className={styles.ul}>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <div className={styles.content}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </span>
            </div>
            <div className={styles.buttonControl}>
              <button onClick={() => editTodo(index)}>
                <Edit />
              </button>
              <button onClick={() => removeTodo(index)}>
                <Trash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

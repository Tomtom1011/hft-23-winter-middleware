import React, {useEffect, useState} from 'react';
import axios from "axios";

const TodoApp = () => {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:8080/api/todos')
            .then(response => setTodos(response.data))
            .catch((err) => {
                console.log(err);
            });
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            // Create a new todo and send it to the Spring Boot API
            axios.post(`http://localhost:8080/api/todos/${newTodo}`, { value: newTodo })
                .then(response => setTodos([...todos, response.data]))
                .catch(error => console.error('Error adding todo:', error));

            setNewTodo('');
        }
    };

    const deleteTodo = (id) => {
        // Delete the todo from the Spring Boot API
        axios.delete(`http://localhost:8080/api/todos/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error('Error deleting todo with id ' + id + ':', error));
    };

    const editTodo = (id, newText) => {
        // Edit the todo on the Spring Boot API
        if (newText !== null) {
            axios.put(`http://localhost:8080/api/todos/${id}/${newText}`, {value: newText})
                .then(response => {
                    setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
                })
                .catch(error => console.error('Error updating todo:', error));
        }
    };

    const getTodoById = (id) => {
        // Fetch a single todo by id from the Spring Boot API
        axios.get(`http://localhost:8080/api/todos/${id}`)
            .then(response => {
                setSelectedTodo(response.data);
                setError('');
            })
            .catch(error => {
                setError('Todo not found');
                setSelectedTodo(null);
            });
    };

    return (
        <div style={containerStyle}>
            <header style={headerStyle}>
                <h1 style={{ margin: 0, fontSize: '24px' }}>Todo App</h1>
            </header>
            <div style={contentStyle}>
                <div style={formContainerStyle}>
                    <input
                        type="text"
                        placeholder="Enter a new todo"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        style={inputStyle}
                    />
                    <button onClick={addTodo} style={buttonStyle}>Add Todo</button>
                </div>
                <div style={listContainerStyle}>
                    <ul style={listStyle}>
                        {todos.map(todo => (
                            <li key={todo.id} style={listItemStyle}>
                                <div style={todoContentStyle}>
                  <span onClick={() => getTodoById(todo.id)} style={todoTextStyle}>
                    {todo.text}
                  </span>
                                    <div style={actionButtonsStyle}>
                                        <button onClick={() => editTodo(todo.id, prompt(`Edit Todo ${todo.text}:`, todo.text))} style={actionButtonStyle}>Edit</button>
                                        <button onClick={() => deleteTodo(todo.id)} style={actionButtonStyle}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {selectedTodo && (
                        <div style={selectedTodoStyle}>
                            <h3>Selected Todo:</h3>
                            <p>{selectedTodo.value}</p>
                        </div>
                    )}
                    {error && <p style={errorStyle}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
};

const headerStyle = {
    color: '#333',
    padding: '15px',
    textAlign: 'center',
};

const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const formContainerStyle = {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
};

const inputStyle = {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    flex: '1',
};

const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    backgroundColor: '#34A853',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    border: 'none',
};

const listContainerStyle = {
    width: '100%',
};

const listStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
};

const listItemStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px',
};

const todoContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const todoTextStyle = {
    cursor: 'pointer',
    color: '#333',
    fontSize: '16px',
};

const actionButtonsStyle = {
    display: 'flex',
    marginLeft: 'auto',
};

const actionButtonStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#4285F4',
    color: '#fff',
    border: 'none',
    fontSize: '14px',
    marginLeft: '10px',
};

const selectedTodoStyle = {
    marginTop: '20px',
};

const errorStyle = {
    color: 'red',
    marginTop: '10px',
};

export default TodoApp;
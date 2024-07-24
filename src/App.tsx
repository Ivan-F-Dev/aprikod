import React from 'react';
import './App.css';
import todos from "./store/Todos";
import {TodoList} from "./components/TodoList/TodoList";

function App() {
  return (
    <div className="App">
        <TodoList list={todos.list}/>
    </div>
  );
}

export default App;

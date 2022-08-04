import React, { useEffect, useRef, useState } from "react";

import TodoItem from "./components/todo-item/todoItem.component";
import "./App.css";
import axios from "axios";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const todoText = useRef(null);
  const month = useRef(null);
  const day = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8080/todos").then((response) => {
      // console.log(response.data.data);
      setTodoList(response.data.data);
    });
  }, []);

  const addTodo = () => {
    let text = todoText.current.value;
    let todoMonth = month.current.value;
    let todoDay = day.current.value;
    axios
      .post("http://localhost:8080/todos", {
        todoText: text,
        month: todoMonth,
        day: todoDay,
        finished: 0,
      })
      .then((response) => {
        console.log(response.data.data);
        setTodoList(response.data.data);
      })
      .then(() => {
        alert("Add insert succeed!");
      });
    todoText.current.value = "";
    month.current.value = "";
    day.current.value = "";
  };

  const changeState = (id) => {
    axios
      .put(`${"http://localhost:8080/todos"}/${id}`)
      .then((response) => {
        setTodoList(response.data.data);
      })
      .then(() => {
        alert("Toggle update succeed!");
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${"http://localhost:8080/todos"}/${id}`)
      .then((response) => {
        setTodoList(response.data.data);
      })
      .then(() => {
        alert("Deleted remove succeed!");
      });
  };

  const sortByTime = () => {
    todoList.sort((a, b) => {
      let aMonth = parseInt(a.month);
      let bMonth = parseInt(b.month);
      let aDay = parseInt(a.day);
      let bDay = parseInt(b.day);
      return aMonth - bMonth || aDay - bDay;
    });
    setTodoList([...todoList]);
  };

  return (
    <div className="App">
      <h1 className="app-title">Todo List</h1>
      <div>
        <span>Add a todo</span>
        <input
          name="todoText"
          type="text"
          maxLength="30"
          placeholder="E.g. Feed the cat"
          ref={todoText}
        ></input>
        <input
          name="month"
          placeholder="m"
          ref={month}
          type="text"
          maxLength="2"
        ></input>
        <input
          name="day"
          placeholder="d"
          ref={day}
          type="text"
          maxLength="2"
        ></input>
        <button onClick={addTodo}>Add</button>
      </div>
      <button type="submit" onClick={() => sortByTime()}>
        Sort By Time
      </button>
      <ul className="todo-list">
        {todoList.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            toggle={() => changeState(item.id)}
            remove={() => deleteTodo(item.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;

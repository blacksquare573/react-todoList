import React, { useState } from "react";

import TodoItem from "./components/todo-item/todoItem.component";
import "./App.css";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const addText = (event) => {
    // console.log("value", event.target.value);
    const newTodo = event.target.value;
    setTodoText(newTodo);
  };

  const addMonth = (event) => {
    const newMonth = event.target.value + "";
    setMonth(newMonth);
  };
  const addDay = (event) => {
    const newDay = event.target.value + "";
    setDay(newDay);
  };

  const addItem = () => {
    if (todoText === "" || month === "" || day === "") {
      alert("请输入内容");
    } else {
      const newTodoItem = {
        todoText: todoText,
        month: month,
        day: day,
        id: todoList.length + 1,
        finished: false,
      };
      let list = [...todoList];
      list.push(newTodoItem);
      setTodoList(list);
    }
  };

  const deleteItem = ({ index }) => {
    const newTodoList = todoList.slice();
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const finishedOrNot = ({ index }) => {
    const newTodoList = todoList.slice();
    newTodoList[index].finished = !newTodoList[index].finished;
    setTodoList(newTodoList);
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
          onChange={addText}
        ></input>
        <input
          name="month"
          placeholder="m"
          onChange={addMonth}
          type="text"
          maxLength="2"
        ></input>
        <input
          name="day"
          placeholder="d"
          onChange={addDay}
          type="text"
          maxLength="2"
        ></input>
        <button onClick={addItem}>Add</button>
      </div>
      <button type="submit" onClick={() => sortByTime()}>
        Sort By Time
      </button>
      <ul className="todo-list">
        {todoList.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            toggle={() => finishedOrNot({ index })}
            remove={() => deleteItem({ index })}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;

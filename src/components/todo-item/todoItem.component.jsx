import "./todo-item.styles.css";
const TodoItem = ({ item, toggle, remove }) => {
  const { todoText, month, day } = item;
  return (
    <div className="todo-item">
      <li
        className="item-content"
        style={{
          textDecoration: item.finished !== 0 ? "line-through" : "none",
        }}
      >
        <p>{todoText}</p>
        <span>
          {month}/{day}
        </span>
      </li>
      <div className="todo-button">
        <button onClick={toggle}>toggle</button>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  );
};

export default TodoItem;

import TodoItem from "../todo-item/todoItem.component";
import "./todo-list.styles.css";

const TodoList = ({ items }, { remove }) => (
  <div className="todo-list">
    {items.map((item, index) => {
      return <TodoItem key={item.id} item={item} remove={remove} />;
    })}
  </div>
);

export default TodoList;

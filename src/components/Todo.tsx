import * as React from "react";
import { ITodo } from "../types/Todo";

type Props = {
  todo: ITodo;
  // onEdit: (id: string) => void;
  onEdit: (todo: ITodo) => void;
  // onDelete: () => void;
};

const Todo: React.FC<Props> = ({ todo, onEdit }) => {
  const { id, title, description } = todo;

  return (
    <div className="Todo">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => onEdit(todo)}>Edit</button> {/* Call the onEdit function with the todo */}
      {/* <button onClick={onDelete}>Delete</button> */}
    </div>
  );
};

export default Todo;

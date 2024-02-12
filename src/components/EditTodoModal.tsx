import * as React from "react";
import { ITodo } from "../types/Todo";

type Props = {
  visible: boolean;
  todo: ITodo;
  onSave: (editedTodo: ITodo) => void;
  onCancel: () => void;
};

const EditTodoModal: React.FC<Props> = ({ visible, todo, onSave, onCancel }) => {
  const [editedTodo, setEditedTodo] = React.useState<Partial<ITodo>>({
    title: todo.title,
    description: todo.description,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTodo({ ...editedTodo, [name]: value });
  };

  const handleSave = () => {
    onSave({ ...todo, ...editedTodo });
  };

  return (
    <div className={`modal ${visible ? "visible" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onCancel}>&times;</span>
        <h2>Edit Todo</h2>
        <form>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedTodo.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={editedTodo.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;

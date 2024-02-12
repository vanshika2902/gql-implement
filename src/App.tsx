// import * as React from "react";
// // import "./styles.css";

// import { GET_TODOS } from "./graphql";
// import { useTodoQuery } from "./useRequest";
// import AddTodo from "./components/AddTodo";
// import Todo from "./components/Todo";
// import { ITodo } from "./types/Todo";
// import EditTodoModal from "./components/EditTodoModal";

// const App: React.FC = () => {
//   const { loading, error, data } = useTodoQuery(GET_TODOS);
//   const [editTodoId, setEditTodoId] = React.useState<string | null>(null);
//   const [isModalVisible, setIsModalVisible] = React.useState(false);

//   const [editedTodo, setEditedTodo] = React.useState<ITodo | null>(null);

//   const handleEditTodo = (id: string) => {
//     const todoToEdit = data?.getTodos.find((todo: ITodo) => todo.id === id);
//     if (todoToEdit) {
//       setEditedTodo(todoToEdit);
//       setIsModalVisible(true);
//     }
//   };

//   if (loading) return <h1>Loading...</h1>;
//   if (error) return <h1>Something went wrong!</h1>;

//   // Add a check for data existence
//   if (!data || !data.getTodos) return null;

//   return (
//     <div className="App">
//       <h1 style={{ textAlign: "center" }}>My Todos</h1>
//       <AddTodo />
//       {data.getTodos.map((todo: ITodo) => (
//         <Todo key={todo.id} todo={todo} onEdit={handleEditTodo} onDelete={() => console.log("Delete operation")}/>
//       ))}
//       <EditTodoModal
//         visible={isModalVisible}
//         todo={editedTodo}
//         onSave={handleSaveEditedTodo}
//         onCancel={handleCancelModal}
//       />

//     </div>
//   );
// };

// export default App;
import * as React from "react";
import { ITodo } from "./types/Todo";
import EditTodoModal from "./components/EditTodoModal";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [editTodo, setEditTodo] = React.useState<ITodo | null>(null);

  // Function to fetch todos from API
  const fetchTodos = () => {
    // Replace this with your API call to fetch todos
    // For demonstration purposes, using mock data
    const mockTodos: ITodo[] = [
      { id: "1", title: "Todo 1", description: "Description 1" },
      { id: "2", title: "Todo 2", description: "Description 2" },
    ];
    setTodos(mockTodos);
  };

  // Fetch todos on component mount
  React.useEffect(() => {
    fetchTodos();
  }, []);

  // Function to handle editing a todo
  const handleEditTodo = (todo: ITodo) => {
    setEditTodo(todo);
  };
  
  // Function to handle saving edited todo
  const handleSaveEditedTodo = (editedTodo: ITodo) => {
    // Update the todo in the todos array
    const updatedTodos = todos.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    setTodos(updatedTodos);
    setEditTodo(null); // Close the modal
  };

  // Function to handle cancelling edit
  const handleCancelEdit = () => {
    setEditTodo(null);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>My Todos</h1>
      <AddTodo />
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onEdit={handleEditTodo} />
      ))}
      {editTodo && (
        <EditTodoModal
          visible={true} // Set to true to make the modal visible
          todo={editTodo}
          onSave={handleSaveEditedTodo}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default App;

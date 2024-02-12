import * as React from "react";
import { ApolloCache } from "@apollo/react-hooks";
import { FetchResult } from "apollo-boost";
import "../index.css";
import { useTodoMutation } from "../useRequest";
import { ADD_TODO, GET_TODOS, UPDATE_TODO, DELETE_TODO } from "../graphql";
import { ITodo, ITodoMutation, ITodos } from "../types/Todo";

const AddTodo: React.FC = () => {
  const [formData, setFormData] = React.useState<ITodo>({ title: "", description: "" });
  const [addTodo] = useTodoMutation(ADD_TODO);
  const [updateTodo] = useTodoMutation(UPDATE_TODO);
  const [deleteTodo] = useTodoMutation(DELETE_TODO);

  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value
    });
  };

  const handleSaveTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      updateTodo({
        variables: { id: formData.id, title: formData.title, description: formData.description },
        update: (cache: ApolloCache<ITodoMutation>, { data }: FetchResult<ITodoMutation>) => {
          const updatedTodo = data && data.updateTodo;
          if (!updatedTodo) return;

          const cacheData = cache.readQuery({ query: GET_TODOS }) as ITodos;
          const updatedTodos = cacheData.getTodos.map(todo => {
            if (todo.id === updatedTodo.id) {
              return updatedTodo;
            }
            return todo;
          });

          cache.writeQuery({
            query: GET_TODOS,
            data: { getTodos: updatedTodos }
          });
        }
      });
    } else {
      addTodo({
        variables: { title: formData.title, description: formData.description },
        update: (cache: ApolloCache<ITodoMutation>, { data }: FetchResult<ITodoMutation>) => {
          const addedTodo = data && data.addTodo;
          if (!addedTodo) return;

          const cacheData = cache.readQuery({ query: GET_TODOS }) as ITodos;
          cache.writeQuery({
            query: GET_TODOS,
            data: { getTodos: [...cacheData.getTodos, addedTodo] }
          });
        }
      });
    }
    setFormData({ title: "", description: "" });
  };

//   const handleDeleteTodo = (id: string) => {
//     deleteTodo({
//       variables: { id },
//       update: (cache: ApolloCache<ITodoMutation>, { data }: FetchResult<ITodoMutation>) => {
//         const deletedTodoId = data && data.deleteTodo && data.deleteTodo.id;
//         if (!deletedTodoId) return;

//         const cacheData = cache.readQuery({ query: GET_TODOS }) as ITodos;
//         const updatedTodos = cacheData.getTodos.filter(todo => todo.id !== deletedTodoId);

//         cache.writeQuery({
//           query: GET_TODOS,
//           data: { getTodos: updatedTodos }
//         });
//       }
//     });
//   };

  return (
    <form className="Form" onSubmit={handleSaveTodo}>
      <div>
        <div>
          <label htmlFor="title">Title</label>
          <input onChange={handleForm} type="text" id="title" value={formData.title} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input onChange={handleForm} type="text" id="description" value={formData.description} />
        </div>
      </div>
      <button type="submit">Save Todo</button>
    </form>
  );
};

export default AddTodo;

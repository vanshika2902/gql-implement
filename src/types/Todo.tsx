export interface ITodo {
    id?: string;
    title: string;
    description: string;
  }
  
  export interface ITodos {
    getTodos: ITodo[];
  }
  
  export type ITodoMutation = {
    addTodo: ITodo;
    updateTodo: ITodo; // Assuming updateTodo also returns a todo
    deleteTodo: ITodo; 
  };
  
//   export type ITodoMutation = {
//     addTodo: ITodo;
//   };

import gql from "graphql-tag";

export const GET_TODOS = gql`
  {
    getTodos {
      id
      title
      description
      status
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $description: String!) {
    addTodo(todoInput: { title: $title, description: $description }) {
      id
      title
      description
      status
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String!, $description: String!) {
    updateTodo(todoInput: { id: $id, title: $title, description: $description }) {
      id
      title
      description
      status
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

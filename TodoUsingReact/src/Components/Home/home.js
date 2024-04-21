import { useEffect, useState } from "react";
import "./home.css";
import TodoForm from "../TodoForm/todoForm";
import TodoList from "../TodoList/todoList";
import EditForm from "../TodoForm/editform";
import UserProfile from "../userProfile";

// Color variables
const backgroundColor1 = "#c3cbd6";
const textColor1 = "#2a403d";

const Home = function ({ name, onLogout }) {
  const [todos, settodos] = useState();
  const [todo, settodo] = useState();
  const [edit, setedit] = useState(false);
  const handleonclick = function (todo) {
    setedit((edit) => !edit);
    settodo(() => todo);
  };
  const editonclick = async function (todo) {
    const url = "http://localhost:3001/to-do-app/" + todo._id;
    const result = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        Authorization: localStorage.getItem("token"), // specify the content type if sending JSON data// Additional headers if needed
      },
      body: JSON.stringify(todo), // Convert data to JSON string
    });
    const result_json = await result.json();
    //console.log("server", result_json);
    // const resultget = await fetch("http://localhost:3001/to-do-app");
    // const result_json = await resultget.json();
    //console.log("entry", todo);
    const indexToUpdate = todos.findIndex((obj) => {
      return obj._id === todo._id;
    });
    //console.log(indexToUpdate);
    if (indexToUpdate !== -1) {
      // Update the value of the desired property within that object
      const updatedJsonData = [...todos]; // Create a shallow copy of the array
      updatedJsonData[indexToUpdate] = {
        ...updatedJsonData[indexToUpdate], // Copy the original object
        ...todo, // Update the value of the desired property
      };

      // Return the updated JSON object

      settodos(() => updatedJsonData);
      setedit((edit) => !edit);
    }
  };
  const parteditonclick = async function (todo) {
    const url = "http://localhost:3001/to-do-app/" + todo._id;
    const result = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        Authorization: localStorage.getItem("token"), // specify the content type if sending JSON data// Additional headers if needed
      },
      body: JSON.stringify(todo), // Convert data to JSON string
    });
    const result_json = await result.json();
    //console.log("server", result_json);
    // const resultget = await fetch("http://localhost:3001/to-do-app");
    // const result_json = await resultget.json();
    //console.log("entry", todo);
    const indexToUpdate = todos.findIndex((obj) => {
      return obj._id === todo._id;
    });
    //console.log(indexToUpdate);
    if (indexToUpdate !== -1) {
      // Update the value of the desired property within that object
      const updatedJsonData = [...todos]; // Create a shallow copy of the array
      updatedJsonData[indexToUpdate] = {
        ...updatedJsonData[indexToUpdate], // Copy the original object
        ...todo, // Update the value of the desired property
      };

      // Return the updated JSON object

      settodos(() => updatedJsonData);
    }
  };
  const handleondelete = async function (todo) {
    const url = "http://localhost:3001/to-do-app/delete/" + todo._id;
    const result = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"), // specify the content type if sending JSON data
      },
    });
    const updatedTodos = todos.filter((obj) => obj._id !== todo._id);
    // Update the state with the modified array
    settodos(updatedTodos);
  };

  useEffect(() => {
    async function fetchAPI() {
      const result = await fetch("http://localhost:3001/to-do-app", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"), // specify the content type if sending JSON data
        },
      });
      const result_json = await result.json();
      settodos(result_json);
    }
    fetchAPI();
  }, []);
  const handleSubmit = async (todo) => {
    const temp = {
      title: todo.title,
      description: todo.description,
      status: todo.status,
      start_date: todo.start_date,
      end_date: todo.end_date,
      email: todo.email,
      category: todo.category,
      priority: todo.priority,
    };
    const postdata = await fetch("http://localhost:3001/to-do-app/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"), // specify the content type if sending JSON data
      },
      body: JSON.stringify(temp),
    });
    const postdata_json = await postdata.json();
    // console.log("postdata", postdata_json);
    // settodos((prevState) => ({
    //   todos: [...prevState.todos, todo],
    // }));
    settodos((prevState) => [...prevState, postdata_json.task]);
  };
  //console.log("todos", todos);
  return (
    <>
      <UserProfile userName={name} onLogout={onLogout} />
      {!edit ? (
        <div
          className="home-container"
          style={{ backgroundColor: backgroundColor1, color: textColor1 }}
        >
          <h1>Todo List</h1>
          <TodoForm onSubmit={handleSubmit} />
          {todos ? (
            <TodoList
              todos={todos}
              handleonclickp={handleonclick}
              handleondelete={handleondelete}
              parteditonclick={parteditonclick}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <EditForm edit={true} todo={todo} editclick={editonclick} />
      )}
    </>
  );
};

export default Home;

// export class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todos: [
//         {
//           title: "Task 1",
//           description: "Description of Task 1",
//           status: "InProgress",
//           useid: missing,_id:missing,priority:missing,
//           startDate: "2024-04-15T08:00",
//           endDate: "2024-04-16T10:00",
//           email: "user@example.com",
//           category: "Category A",
//         },
//         {
//           title: "Task 2",
//           description: "Description of Task 2",
//           status: "Completed",
//           startDate: "2024-04-15T12:00",
//           endDate: "2024-04-16T14:00",
//           email: "user@example.com",
//           category: "Category B",
//         },
//         {
//           title: "Task 3",
//           description: "Description of Task 3",
//           status: "New",
//           startDate: "2024-04-17T09:00",
//           endDate: "2024-04-17T11:00",
//           email: "user@example.com",
//           category: "Category A",
//         },
//         {
//           title: "Task 4",
//           description: "Description of Task 4",
//           status: "OnHold",
//           startDate: "2024-04-17T12:00",
//           endDate: "2024-04-17T14:00",
//           email: "user@example.com",
//           category: "Category B",
//         },
//         {
//           title: "Task 5",
//           description: "Description of Task 1",
//           status: "InProgress",
//           startDate: "2024-04-15T08:00",
//           endDate: "2024-04-16T10:00",
//           email: "user@example.com",
//           category: "Category A",
//         },
//         {
//           title: "Task 6",
//           description: "Description of Task 2",
//           status: "Completed",
//           startDate: "2024-04-15T12:00",
//           endDate: "2024-04-16T14:00",
//           email: "user@example.com",
//           category: "Category B",
//         },
//         {
//           title: "Task 7",
//           description: "Description of Task 3",
//           status: "New",
//           startDate: "2024-04-17T09:00",
//           endDate: "2024-04-17T11:00",
//           email: "user@example.com",
//           category: "Category A",
//         },
//         {
//           title: "Task 8",
//           description: "Description of Task 4",
//           status: "OnHold",
//           startDate: "2024-04-17T12:00",
//           endDate: "2024-04-17T14:00",
//           email: "user@example.com",
//           category: "Category B",
//         },
//       ],
//     };
//   }

//   handleSubmit = (todo) => {
//     this.setState((prevState) => ({
//       todos: [...prevState.todos, todo],
//     }));
//   };

//   render() {
//     return (
//       <div
//         className="home-container"
//         style={{ backgroundColor: backgroundColor1, color: textColor1 }}
//       >
//         <h1>Todo List</h1>
//         <TodoForm onSubmit={this.handleSubmit} />
//         <TodoList todos={this.state.todos} />
//       </div>
//     );
//   }
// }

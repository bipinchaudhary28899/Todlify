import { useEffect, useState } from "react";
import "./home.css";
import TodoForm from "../TodoForm/todoForm";
import TodoList from "../TodoList/todoList";
import EditForm from "../TodoForm/editform";

// // Color variables
// const backgroundColor1 = "#c3cbd6";
// const textColor1 = "#2a403d";

const Home = function () {
  const [todos, settodos] = useState([]);
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
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(todo),
    });
    const result_json = await result.json();
    const indexToUpdate = todos.findIndex((obj) => obj._id === todo._id);
    if (indexToUpdate !== -1) {
      const updatedJsonData = [...todos];
      updatedJsonData[indexToUpdate] = {
        ...updatedJsonData[indexToUpdate],
        ...todo,
      };
      settodos(updatedJsonData);
      setedit((edit) => !edit);
    }
  };

  const parteditonclick = async function (todo) {
    const url = "http://localhost:3001/to-do-app/" + todo._id;
    const result = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(todo),
    });
    const result_json = await result.json();
    const indexToUpdate = todos.findIndex((obj) => obj._id === todo._id);
    if (indexToUpdate !== -1) {
      const updatedJsonData = [...todos];
      updatedJsonData[indexToUpdate] = {
        ...updatedJsonData[indexToUpdate],
        ...todo,
      };
      settodos(updatedJsonData);
    }
  };

  const handleondelete = async function (todo) {
    const url = "http://localhost:3001/to-do-app/delete/" + todo._id;
    const result = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const updatedTodos = todos.filter((obj) => obj._id !== todo._id);
    settodos(updatedTodos);
  };

  useEffect(() => {
    async function fetchAPI() {
      const result = await fetch("http://localhost:3001/to-do-app", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
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
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(temp),
    });
    const postdata_json = await postdata.json();
    settodos((prevState) => [...prevState, postdata_json.task]);
  };

  return (
    <>
      {!edit ? (
        <div
          className="home-container container-fluid"
          style={{ backgroundColor: "transparent"}}
        >
          <div className="form-container glass">
            <TodoForm onSubmit={handleSubmit} />
          </div>
          <div className="list-container">
            {todos.length > 0 ? (
              <TodoList
                todos={todos}
                handleonclickp={handleonclick}
                handleondelete={handleondelete}
                parteditonclick={parteditonclick}
              />
            ) : (
              <p className="text-center">No tasks available.</p>
            )}
          </div>
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

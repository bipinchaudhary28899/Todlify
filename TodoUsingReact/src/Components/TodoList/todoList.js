import React, { useState } from "react";
import TodoCard from "../TodoCard/todoCard";
import "./todoList.css";

const TodoList = ({
  todos,
  handleonclickp,
  handleondelete,
  parteditonclick,
}) => {
  // Color variables
  //const [todolist, settodolist] = useState(todos);
  const backgroundColor1 = "#c3cbd6";
  const textColor1 = "#2a403d";
  //console.log(todos);

  const update = function (todo) {
    // const result = await fetch("http://localhost:3001/to-do-app/{todo._id}", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json", // Set content type to JSON
    //     // Additional headers if needed
    //   },
    //   body: JSON.stringify(todo), // Convert data to JSON string
    // });
    // const resultget = await fetch("http://localhost:3001/to-do-app");
    // const result_json = await resultget.json();
    const indexToUpdate = todos.findIndex((obj) => {
      return obj._id === todo._id;
    });
    if (indexToUpdate !== -1) {
      // Update the value of the desired property within that object
      const updatedJsonData = [...todos]; // Create a shallow copy of the array
      updatedJsonData[indexToUpdate] = {
        ...updatedJsonData[indexToUpdate], // Copy the original object
        ...todo, // Update the value of the desired property
      };

      // Return the updated JSON object

      //settodolist(() => updatedJsonData);
    }
  };

  // Group todos by category
  const todosByCategory = todos.reduce((acc, todo) => {
    let category;
    if (!todo.category) {
      category = "others";
      if (!acc[category]) {
        acc["others"] = [];
      }
    } else if (!acc[todo.category]) {
      acc[todo.category] = [];
    }
    category ? acc[category].push(todo) : acc[todo.category].push(todo);
    return acc;
  }, {});
  // Get today's and tomorrow's date
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Filter todos for today and tomorrow
  const todosToday = todos.filter((todo) => {
    const dueDate = new Date(todo.end_date);
    return dueDate.toDateString() === today.toDateString();
  });

  const todosTomorrow = todos.filter((todo) => {
    const dueDate = new Date(todo.end_date);
    return dueDate.toDateString() === tomorrow.toDateString();
  });

  // Paginate todos for Today's Todos
  const [currentPageToday, setCurrentPageToday] = useState(1);
  const todosPerPageToday = 3;

  const indexOfLastTodoToday = currentPageToday * todosPerPageToday;
  const indexOfFirstTodoToday = indexOfLastTodoToday - todosPerPageToday;
  const currentTodosToday = todosToday.slice(
    indexOfFirstTodoToday,
    indexOfLastTodoToday
  );

  // Paginate todos for Tomorrow's Todos
  const [currentPageTomorrow, setCurrentPageTomorrow] = useState(1);
  const todosPerPageTomorrow = 3;

  const indexOfLastTodoTomorrow = currentPageTomorrow * todosPerPageTomorrow;
  const indexOfFirstTodoTomorrow =
    indexOfLastTodoTomorrow - todosPerPageTomorrow;
  const currentTodosTomorrow = todosTomorrow.slice(
    indexOfFirstTodoTomorrow,
    indexOfLastTodoTomorrow
  );

  // Paginate todos for Todos by Category
  const [currentPageCategory, setCurrentPageCategory] = useState({});
  const todosPerPageCategory = 3;

  const currentTodosByCategory = Object.keys(todosByCategory).reduce(
    (acc, category) => {
      const currentPage = currentPageCategory[category] || 1;
      const indexOfLastTodoCategory = currentPage * todosPerPageCategory;
      const indexOfFirstTodoCategory =
        indexOfLastTodoCategory - todosPerPageCategory;
      acc[category] = todosByCategory[category].slice(
        indexOfFirstTodoCategory,
        indexOfLastTodoCategory
      );
      return acc;
    },
    {}
  );

  // Change page for Today's Todos
  const paginateToday = (pageNumber) => setCurrentPageToday(pageNumber);

  // Change page for Tomorrow's Todos
  const paginateTomorrow = (pageNumber) => setCurrentPageTomorrow(pageNumber);

  // Change page for Todos by Category
  const paginateCategory = (pageNumber, category) => {
    setCurrentPageCategory((prevState) => ({
      ...prevState,
      [category]: pageNumber,
    }));
  };
  return (
    <div style={{ backgroundColor: backgroundColor1, color: textColor1 }}>
      <div className="todos">
        <div>
          <h2>Today's Todos</h2>
          {currentTodosToday.map((todo, index) => (
            <TodoCard
              key={index}
              todo={todo}
              update={update}
              handleonclickp={handleonclickp}
              handleondelete={handleondelete}
              parteditonclick={parteditonclick}
            />
          ))}
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(todosToday.length / todosPerPageToday),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPageToday === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginateToday(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Tomorrow's Todos</h2>
          {currentTodosTomorrow.map((todo, index) => (
            <TodoCard
              key={index}
              todo={todo}
              update={update}
              handleonclickp={handleonclickp}
              handleondelete={handleondelete}
              parteditonclick={parteditonclick}
            />
          ))}
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(todosTomorrow.length / todosPerPageTomorrow),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPageTomorrow === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginateTomorrow(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2>Todos by Category</h2>
        <div className="todos">
          {Object.entries(currentTodosByCategory).map(([category, todos]) => (
            <div key={category}>
              <h3>{category}</h3>
              <div>
                {todos.map((todo, index) => (
                  <TodoCard
                    key={index}
                    todo={todo}
                    update={update}
                    handleonclickp={handleonclickp}
                    handleondelete={handleondelete}
                    parteditonclick={parteditonclick}
                  />
                ))}
              </div>
              <ul className="pagination">
                {Array.from({
                  length: Math.ceil(
                    todosByCategory[category].length / todosPerPageCategory
                  ),
                }).map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPageCategory[category] === index + 1
                        ? "active"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginateCategory(index + 1, category)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;

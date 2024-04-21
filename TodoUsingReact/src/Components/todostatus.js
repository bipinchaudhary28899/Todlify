import { useState } from "react";
const StatusList = function ({ todo, update }) {
  const checkstatus = todo.status;
  if (checkstatus === "New") {
    return (
      <div>
        <label htmlFor="dropdown">Mark the status:</label>
        <select
          id="dropdown"
          value={checkstatus}
          onChange={(e) => {
            todo.status = e.target.value;
            // console.log("check", todo);
            update(todo);
          }}
        >
          <option value="New">{checkstatus}</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
          <option value="onhold">OnHold</option>
        </select>
      </div>
    );
  } else if (checkstatus === "InProgress") {
    return (
      <div>
        <label htmlFor="dropdown">Mark the status:</label>
        <select
          id="dropdown"
          value={checkstatus}
          onChange={(e) => {
            todo.status = e.target.value;
            update(todo);
          }}
        >
          <option value="New">New</option>
          <option value="InProgress">{checkstatus}</option>
          <option value="Completed">Completed</option>
          <option value="onhold">OnHold</option>
        </select>
      </div>
    );
  } else if (checkstatus === "Completed") {
    return (
      <div>
        <label htmlFor="dropdown">Mark the status:</label>
        <select
          id="dropdown"
          value={checkstatus}
          onChange={(e) => {
            todo.status = e.target.value;
            //console.log(todo);
            update(todo);
          }}
        >
          <option value="New">New</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">{checkstatus}</option>
          <option value="onhold">OnHold</option>
        </select>
      </div>
    );
  } else if (checkstatus === "onhold") {
    return (
      <div>
        <label htmlFor="dropdown">Mark the status:</label>
        <select
          id="dropdown"
          value={checkstatus}
          onChange={(e) => {
            todo.status = e.target.value;
            update(todo);
          }}
        >
          <option value="New">New</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
          <option value="onhold">{checkstatus}</option>
        </select>
      </div>
    );
  }
};

export default StatusList;

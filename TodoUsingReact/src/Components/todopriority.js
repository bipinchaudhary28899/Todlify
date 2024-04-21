import { useState } from "react";
const PriorityList = function ({ todo, update }) {
  const checkpriority = todo.priority;
  if (checkpriority === "Normal") {
    return (
      <div>
        <label htmlFor="dropdown">Mark the priority:</label>
        <select
          id="dropdown"
          value={checkpriority}
          onChange={(e) => {
            todo.priority = e.target.value;
            update(todo);
          }}
        >
          <option value="Normal">{checkpriority}</option>
          <option value="Urgent">Urgent</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
    );
  } else if (checkpriority === "Urgent") {
    return (
      <div>
        <label htmlFor="dropdown">Mark the priority:</label>
        <select
          id="dropdown"
          value={checkpriority}
          onChange={(e) => {
            todo.priority = e.target.value;
            update(todo);
          }}
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">{checkpriority}</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
    );
  } else if (checkpriority === "Critical") {
    return (
      <div>
        <label htmlFor="dropdown">Mark the priority:</label>
        <select
          id="dropdown"
          value={checkpriority}
          onChange={(e) => {
            todo.priority = e.target.value;
            update(todo);
          }}
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
          <option value="Critical">{checkpriority}</option>
        </select>
      </div>
    );
  }
};

export default PriorityList;

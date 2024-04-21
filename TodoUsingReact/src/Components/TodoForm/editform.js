import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const TodoForm = ({ update, todo, editclick }) => {
  const [_id, setid] = useState(todo._id);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [status, setStatus] = useState(todo.status);
  const [priority, setpriority] = useState(todo.priority);
  const [start_date, setStartDate] = useState(todo.start_date);
  const [end_date, setEndDate] = useState(todo.end_date);
  const [email, setEmail] = useState(todo.email);
  const [category, setCategory] = useState(todo.category);
  const handleSubmit = (e) => {
    e.preventDefault();
    editclick({
      _id,
      title,
      description,
      status,
      priority,
      start_date,
      end_date,
      email,
      category,
    });
    // console.log({
    //   title,
    //   description,
    //   status,
    //   priority,
    //   start_date,
    //   end_date,
    //   email,
    //   category,
    // });
    // Reset form fields
    setTitle("");
    setDescription("");
    setStatus("");
    setpriority("");
    setStartDate("");
    setEndDate("");
    setEmail("");
    setCategory("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title" style={{ marginBottom: "15px" }}>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="description" style={{ marginBottom: "15px" }}>
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="status" style={{ marginBottom: "15px" }}>
        <Form.Label>Status:</Form.Label>
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="InProgress">InProgress</option>
          <option value="New">New</option>
          <option value="Completed">Completed</option>
          <option value="OnHold">OnHold</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="priority" style={{ marginBottom: "15px" }}>
        <Form.Label>Priority:</Form.Label>
        <Form.Select
          value={priority}
          onChange={(e) => setpriority(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
          <option value="Critical">Critical</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="startDate" style={{ marginBottom: "15px" }}>
        <Form.Label>Start Date:</Form.Label>
        <Form.Control
          type="datetime-local"
          value={start_date.slice(0, 16)}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="endDate" style={{ marginBottom: "15px" }}>
        <Form.Label>End Date:</Form.Label>
        <Form.Control
          type="datetime-local"
          value={end_date.slice(0, 16)}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="email" style={{ marginBottom: "15px" }}>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="category" style={{ marginBottom: "15px" }}>
        <Form.Label>Category:</Form.Label>
        <Form.Control
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group>
      <div className="text-center mt-3 mb-3">
        {update ? (
          <Button variant="primary" type="submit">
            Edit
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default TodoForm;

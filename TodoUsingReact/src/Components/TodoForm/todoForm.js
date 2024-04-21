import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SignupForm from "../usersign";

const TodoForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setpriority] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [formErrors, setformErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !status ||
      !priority ||
      !start_date ||
      !end_date ||
      !email ||
      !category
    ) {
      setformErrors({
        title: !title ? "title is required" : "",
        description: !description ? "Description is required" : "",
        status: !status ? "status is required" : "",
        priority: !priority ? "priority is required" : "",
        start_date: !start_date ? "start_date is required" : "",
        end_date: !end_date ? "end_date is required" : "",
        email: !email ? "email is required" : "",
        category: !category ? "category is required" : "",
      });
      return;
    }
    onSubmit({
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
  const errorstyle = { display: "block" };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title" style={{ marginBottom: "15px" }}>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {formErrors.title && (
          <div className="invalid-feedback" style={errorstyle}>
            {formErrors.title}
          </div>
        )}
      </Form.Group>
      <Form.Group controlId="description" style={{ marginBottom: "15px" }}>
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {formErrors.description && (
          <div className="invalid-feedback" style={errorstyle}>
            {formErrors.description}
          </div>
        )}
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
        {formErrors.status && (
          <div className="invalid-feedback" style={errorstyle}>
            {formErrors.status}
          </div>
        )}
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
        {formErrors.priority && (
          <div className="invalid-feedback" style={errorstyle}>
            {formErrors.priority}
          </div>
        )}
      </Form.Group>
      <Form.Group controlId="startDate" style={{ marginBottom: "15px" }}>
        <Form.Label>Start Date:</Form.Label>
        <Form.Control
          type="datetime-local"
          value={start_date}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {formErrors.start_date && (
          <div className="invalid-feedback" style={errorstyle}>
            {formErrors.start_date}
          </div>
        )}
      </Form.Group>
      <Form.Group controlId="endDate" style={{ marginBottom: "15px" }}>
        <Form.Label>End Date:</Form.Label>
        <Form.Control
          type="datetime-local"
          value={end_date}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {formErrors.end_date && (
          <div className="invalid-feedback" style={errorstyle}>
            {formErrors.end_date}
          </div>
        )}
      </Form.Group>
      <Form.Group controlId="email" style={{ marginBottom: "15px" }}>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formErrors.email && (
          <div className="invalid-feedback" style={errorstyle}>
            {formErrors.email}
          </div>
        )}
      </Form.Group>
      <Form.Group controlId="category" style={{ marginBottom: "15px" }}>
        <Form.Label>Category:</Form.Label>
        <Form.Control
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {formErrors.category && (
          <div className="invalid-feedback" style={errorstyle}>
            {formErrors.category}
          </div>
        )}
      </Form.Group>
      <div className="text-center mt-3 mb-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default TodoForm;

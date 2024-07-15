import React from "react";
import { Card, Button } from "react-bootstrap";
import StatusList from "../todostatus";
import PriorityList from "../todopriority";
import "./todoCard.css";

// Color variables
// const textColor1 = "#2a403d";

const TodoCard = ({
  todo,
  index,
  update,
  handleonclickp,
  handleondelete,
  parteditonclick,
}) => {
  const handleonclick = function (todo) {
    handleonclickp(todo);
    //update(todo);
  };
  const handleonclickdelete = function (todo) {
    handleondelete(todo);
  };
  return (
    <Card
      className="todo-card grow glass"
      style={{
        width: "60vw", // Ensures card takes up full width of its container
        maxWidth: "600px", // Limits maximum width for better readability
        margin: "0 auto", // Centers the card within its container
        marginBottom: "20px", // Adds space between cards
      }}
    >
      <Card.Body>
        <Card.Title className="text-center text-uppercase text-bold">{todo.title}</Card.Title>
        <Card.Subtitle className="mb-4 text-dark" class="text-capitalize ">
          <StatusList  todo={todo} update={parteditonclick} />
          <PriorityList  todo={todo} update={parteditonclick} />
        </Card.Subtitle>
        <Card.Text className="text-dark">{todo.description}</Card.Text>
        <Button onClick={() => handleonclick(todo)} variant="primary">
          Edit
        </Button>
        <span className="me-2"></span>
        <Button  onClick={() => handleonclickdelete(todo)} variant="primary">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TodoCard;

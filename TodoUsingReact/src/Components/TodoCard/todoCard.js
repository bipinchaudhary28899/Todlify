import React from "react";
import { Card, Button } from "react-bootstrap";
import StatusList from "../todostatus";
import PriorityList from "../todopriority";

// Color variables
const backgroundColor2 = "#748b6f";
const textColor1 = "#2a403d";

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
      className="todo-card"
      style={{ backgroundColor: backgroundColor2, borderColor: textColor1 }}
    >
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <StatusList todo={todo} update={parteditonclick} />
          <PriorityList todo={todo} update={parteditonclick} />
        </Card.Subtitle>
        <Card.Text>{todo.description}</Card.Text>
        <Button onClick={() => handleonclick(todo)} variant="primary">
          Edit
        </Button>
        <span className="me-2"></span>
        <Button onClick={() => handleonclickdelete(todo)} variant="primary">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TodoCard;

const SendReminder = require("./reminder");
const cron = require("node-cron");
const Todo = require("./models/Todo");
const User = require("./models/User");

// Schedule reminders
const Schedule = async (id) => {
  // Send a reminder for critical issue twice a day 0 9,18

  cron.schedule("* * * * *", async () => {
    try {
      const todos = await Todo.find({ user_id: id });
      todos.forEach((todo) => {
        if (todo.priority === "Critical" || todo.priority === "Urgent") {
          SendReminder(todo.priority, todo.title, todo.email);
        }
      });
    } catch (error) {
      console.error("Error fetching high priority issues:", error);
    }
  });
  cron.schedule("*/2 * * * *", async () => {
    try {
      const todos = await Todo.find({ user_id: id });
      todos.forEach((todo) => {
        if (todo.priority === "Normal") {
          SendReminder(todo.priority, todo.title, todo.email);
        }
      });
    } catch (error) {
      console.error("Error fetching medium priority issues:", error);
    }
  });
};

module.exports = Schedule;

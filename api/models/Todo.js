const mongoose = require("mongoose");
const User = require("./User");

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // heading
  description: { type: String, required: true },
  status: { type: String, required: true }, //pending,done,hold.
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: User },
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date, default: null },
  email: { type: String, default: null },
  category: { type: String, default: null }, //personal,professional,others
  priority: { type: String, default: "normal" }, //critical,urgent,normal
});

module.exports = mongoose.model("Todo", TodoSchema);

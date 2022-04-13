const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
var NoteSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },  //referencing the User model
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

//Export the model
module.exports = mongoose.model("note", NoteSchema);

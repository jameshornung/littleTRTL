var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var DoNotSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  university: {
    type: String
  },
  program: {
    type: String
  },
  role: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  stage: {
    type: String
  },
  notes: {
    type: String
  },
  modified: {
    type: Date,
    default: Date.now()
  }
}, {collection: "do_not_move_forward"});

var DoNot = mongoose.model("DoNot", DoNotSchema);

module.exports = DoNot;
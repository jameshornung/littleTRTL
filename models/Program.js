var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ProgramSchema = new Schema({
  programName: {
    type: String,
    required: true,
    unique: true
  },
  modified: {
    type: Date,
    default: Date.now()
  }
}, {collection: "programs"});

var Program = mongoose.model("Program", ProgramSchema);

module.exports = Program;
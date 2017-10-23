var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var UniversitySchema = new Schema({
  universityName: {
    type: String,
    required: true,
    unique: true
  },
  modified: {
    type: Date,
    default: Date.now()
  }
}, {collection: "universities"});

var University = mongoose.model("University", UniversitySchema);

module.exports = University;
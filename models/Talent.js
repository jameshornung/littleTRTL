var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var TalentSchema = new Schema({
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
}, {collection: "talent_pool"});

var Talent = mongoose.model("Talent", TalentSchema);

module.exports = Talent;


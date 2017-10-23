var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ExistingSchema = new Schema({
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
}, {collection: "existing_pipeline"});

var Existing = mongoose.model("Existing", ExistingSchema);

module.exports = Existing;
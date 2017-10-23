var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var CandidateSchema = new Schema({

  // Capture Demographics and Replace Greenhouse
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  alternateEmail: {
    type: String
  },
  phone: {
    type: String
  },
  linkedIn: {
    type: String
  },
  website: {
    type: String
  },
  university: {
    type: String,
  },
  program: {
    type: String
  },
  role: {
    type: String
  },
  notes: {
    type: String
  },
  recruiterName: {
    type: String
  },
  status: {
    type: Number
  },
  failed: {
    type: Boolean,
    default: false
  },
  rejected: {
    type: Boolean,
    default: false
  },

  // HR Interview

  hrInterviewerName: {
    type: String
  },
  dateOfHrInterview: {
    type: Date,
    default: Date.now()
  },
  hrNotes: {
    type: String
  },
  hrScores: {
    type: Array
  },
  resultOfHrInterview: {
    type: String
  },

  // Tech Interview


  techInterviewerName: {
    type: String
  },
  dateOfTechInterview: {
    type: Date
  },
  techNotes: {
    type: String
  },
  techScores: {
    type: Array
  },
  resultOfTechInterview: {
    type: String
  },

  // Final Interview

  finalInterviewerName: {
    type: String
  },
  dateOfFinalInterview: {
    type: Date
  },
  finalNotes: {
    type: String
  },
  finalScores: {
    type: Array
  },
  resultofFinalInterview: {
    type: String
  },

  // Offer Call

  emailConnectWithMe: {
    type: Date
  },
  verbalAgreement: {
    type: Boolean
  },
  contemplatingOffer: {
    type: Boolean,
    default: false
  },
  employmentLevel: {
    type: String
  },
  primaryCohort: {
    type: String
  },
  secondaryCohort: {
    type: String
  },
  tertiaryCohort: {
    type: String
  },
  quaternaryCohort: {
    type: String
  },
  quinaryCohort: {
    type: String
  },
  onboardingPayment: {
    type: Number
  },
  basePay: {
    type: Number
  },
  completionBonus: {
    type: Number
  },
  hiringNotes: {
    type: String
  },

  // On Boarding
    
  returnedContract: {
    type: Boolean
  },
  onBoardingScheduled: {
    type: Boolean
  },
  completedOnboardingSession: {
    type: Boolean
  },
  onboardingNotes: {
    type: String
  }
}, {collection: "prospects"});

var Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;
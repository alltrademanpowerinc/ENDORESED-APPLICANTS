const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      lowercase: true,
    },
    phone: String,
    location: String,
    resume: String, // URL or file path
    experience: Number, // Years of experience
    skills: [String],
    availability: {
      type: String,
      enum: ['Immediate', '2 weeks', '1 month', 'TBD'],
      default: 'TBD',
    },
    status: {
      type: String,
      enum: ['New', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'],
      default: 'New',
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Candidate', candidateSchema);

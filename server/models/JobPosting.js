const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    type: {
      type: String,
      enum: ['Concession', 'Company-Op', 'Store Manager', 'Other'],
      default: 'Company-Op',
    },
    description: String,
    responsibilities: [String],
    requirements: [String],
    shortfalls: {
      type: Number,
      default: 1,
    },
    inReview: {
      type: Number,
      default: 0,
    },
    hired: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Open', 'Closed', 'On Hold'],
      default: 'Open',
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    department: String,
    salary: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('JobPosting', jobPostingSchema);

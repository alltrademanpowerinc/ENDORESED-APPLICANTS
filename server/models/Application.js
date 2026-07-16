const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPosting',
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'In Review', 'Shortlisted', 'Rejected', 'Accepted'],
      default: 'Draft',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    submittedDate: Date,
    reviewedDate: Date,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    comments: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);

const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resume: {
    type: String, // URL or file path
  },
  status: {
    type: String,
    enum: ['applied', 'interviewed', 'offered', 'hired', 'rejected'],
    default: 'applied',
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant',
    default: null,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Applicant', applicantSchema);

const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  referrerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant',
    required: true,
  },
  referreeName: {
    type: String,
    required: true,
  },
  referreeEmail: {
    type: String,
    required: true,
  },
  referreePhone: {
    type: String,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'applied'],
    default: 'pending',
  },
  referralBonus: {
    type: Number,
    default: 0, // Amount in dollars or points
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Referral', referralSchema);

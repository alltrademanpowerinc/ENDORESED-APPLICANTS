const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock data
const applications = [];

// @route   GET /api/applications
// @desc    Get all applications
// @access  Private
router.get('/', protect, (req, res) => {
  res.json({
    success: true,
    count: applications.length,
    data: applications,
  });
});

// @route   GET /api/applications/:id
// @desc    Get specific application
// @access  Private
router.get('/:id', protect, (req, res) => {
  const application = applications.find(a => a.id === parseInt(req.params.id));

  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }

  res.json({ success: true, data: application });
});

// @route   POST /api/applications
// @desc    Create new application
// @access  Private
router.post('/', protect, (req, res) => {
  const { jobId, candidateId } = req.body;

  if (!jobId || !candidateId) {
    return res.status(400).json({ error: 'Please provide jobId and candidateId' });
  }

  const newApplication = {
    id: applications.length + 1,
    jobId,
    candidateId,
    status: 'Draft',
    submittedBy: req.user.id,
    appliedDate: new Date(),
  };

  applications.push(newApplication);

  res.status(201).json({
    success: true,
    message: 'Application created successfully',
    data: newApplication,
  });
});

// @route   PUT /api/applications/:id
// @desc    Update application
// @access  Private
router.put('/:id', protect, (req, res) => {
  const application = applications.find(a => a.id === parseInt(req.params.id));

  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }

  Object.assign(application, req.body);

  res.json({
    success: true,
    message: 'Application updated successfully',
    data: application,
  });
});

// @route   PUT /api/applications/:id/submit
// @desc    Submit application
// @access  Private
router.put('/:id/submit', protect, (req, res) => {
  const application = applications.find(a => a.id === parseInt(req.params.id));

  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }

  application.status = 'Submitted';
  application.submittedDate = new Date();

  res.json({
    success: true,
    message: 'Application submitted successfully',
    data: application,
  });
});

module.exports = router;

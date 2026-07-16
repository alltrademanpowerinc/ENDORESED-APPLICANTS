const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock data
const jobs = [
  {
    id: 1,
    title: 'RCC Merchandiser',
    location: 'Davao',
    type: 'Company-Op',
    shortfalls: 1,
    inReview: 0,
    status: 'Open',
    postedDate: '2024-06-18',
  },
  {
    id: 2,
    title: 'Store Manager',
    location: 'Makati',
    type: 'Concession',
    shortfalls: 1,
    inReview: 1,
    status: 'Open',
    postedDate: '2024-06-18',
  },
  {
    id: 3,
    title: 'Sales Associate',
    location: 'Manila',
    type: 'Company-Op',
    shortfalls: 1,
    inReview: 0,
    status: 'Open',
    postedDate: '2024-06-18',
  },
];

// @route   GET /api/jobs
// @desc    Get all job postings
// @access  Public
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: jobs.length,
    data: jobs,
  });
});

// @route   GET /api/jobs/:id
// @desc    Get specific job posting
// @access  Public
router.get('/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));

  if (!job) {
    return res.status(404).json({ error: 'Job posting not found' });
  }

  res.json({ success: true, data: job });
});

// @route   POST /api/jobs
// @desc    Create new job posting
// @access  Private
router.post('/', protect, (req, res) => {
  const { title, location, type, description, shortfalls } = req.body;

  if (!title || !location) {
    return res.status(400).json({ error: 'Please provide title and location' });
  }

  const newJob = {
    id: jobs.length + 1,
    title,
    location,
    type: type || 'Company-Op',
    description,
    shortfalls: shortfalls || 1,
    inReview: 0,
    status: 'Open',
    postedDate: new Date().toISOString().split('T')[0],
  };

  jobs.push(newJob);

  res.status(201).json({
    success: true,
    message: 'Job posting created successfully',
    data: newJob,
  });
});

// @route   PUT /api/jobs/:id
// @desc    Update job posting
// @access  Private
router.put('/:id', protect, (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));

  if (!job) {
    return res.status(404).json({ error: 'Job posting not found' });
  }

  Object.assign(job, req.body);

  res.json({
    success: true,
    message: 'Job posting updated successfully',
    data: job,
  });
});

// @route   DELETE /api/jobs/:id
// @desc    Delete job posting
// @access  Private
router.delete('/:id', protect, (req, res) => {
  const index = jobs.findIndex(j => j.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Job posting not found' });
  }

  const deletedJob = jobs.splice(index, 1);

  res.json({
    success: true,
    message: 'Job posting deleted successfully',
    data: deletedJob,
  });
});

module.exports = router;

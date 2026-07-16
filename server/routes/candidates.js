const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock data
const candidates = [
  {
    id: 1,
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan@example.com',
    phone: '+63-9XX-XXX-XXXX',
    location: 'Davao',
    experience: 3,
    skills: ['Sales', 'Customer Service', 'Retail'],
    status: 'New',
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria@example.com',
    phone: '+63-9XX-XXX-XXXX',
    location: 'Makati',
    experience: 5,
    skills: ['Management', 'Sales', 'Leadership'],
    status: 'Reviewed',
  },
];

// @route   GET /api/candidates
// @desc    Get all candidates
// @access  Private
router.get('/', protect, (req, res) => {
  res.json({
    success: true,
    count: candidates.length,
    data: candidates,
  });
});

// @route   GET /api/candidates/:id
// @desc    Get specific candidate
// @access  Private
router.get('/:id', protect, (req, res) => {
  const candidate = candidates.find(c => c.id === parseInt(req.params.id));

  if (!candidate) {
    return res.status(404).json({ error: 'Candidate not found' });
  }

  res.json({ success: true, data: candidate });
});

// @route   POST /api/candidates
// @desc    Create new candidate
// @access  Private
router.post('/', protect, (req, res) => {
  const { firstName, lastName, email, phone, location, experience, skills } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Please provide firstName, lastName, and email' });
  }

  const newCandidate = {
    id: candidates.length + 1,
    firstName,
    lastName,
    email,
    phone,
    location,
    experience: experience || 0,
    skills: skills || [],
    status: 'New',
    submittedBy: req.user.id,
    createdAt: new Date(),
  };

  candidates.push(newCandidate);

  res.status(201).json({
    success: true,
    message: 'Candidate created successfully',
    data: newCandidate,
  });
});

// @route   PUT /api/candidates/:id
// @desc    Update candidate
// @access  Private
router.put('/:id', protect, (req, res) => {
  const candidate = candidates.find(c => c.id === parseInt(req.params.id));

  if (!candidate) {
    return res.status(404).json({ error: 'Candidate not found' });
  }

  Object.assign(candidate, req.body);

  res.json({
    success: true,
    message: 'Candidate updated successfully',
    data: candidate,
  });
});

// @route   DELETE /api/candidates/:id
// @desc    Delete candidate
// @access  Private
router.delete('/:id', protect, (req, res) => {
  const index = candidates.findIndex(c => c.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Candidate not found' });
  }

  const deletedCandidate = candidates.splice(index, 1);

  res.json({
    success: true,
    message: 'Candidate deleted successfully',
    data: deletedCandidate,
  });
});

module.exports = router;

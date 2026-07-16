const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Applicant = require('../models/Applicant');
const Referral = require('../models/Referral');

// ===== JOB ROUTES =====

// Get all jobs
router.get('/jobs', async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single job with referral count
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const referralCount = await Referral.countDocuments({ jobId: req.params.id });
    const applicantCount = await Applicant.countDocuments({ jobId: req.params.id });

    res.json({
      ...job.toObject(),
      referralCount,
      applicantCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new job
router.post('/jobs', async (req, res) => {
  const job = new Job({
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    salary: req.body.salary,
    description: req.body.description,
    status: req.body.status || 'open',
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update job
router.put('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    Object.assign(job, req.body);
    job.updatedAt = Date.now();

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ===== APPLICATION ROUTES =====

// Submit application
router.post('/apply', async (req, res) => {
  const applicant = new Applicant({
    jobId: req.body.jobId,
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    resume: req.body.resume,
    referredBy: req.body.referredBy || null,
  });

  try {
    const newApplicant = await applicant.save();
    
    // If referred, update referral status
    if (req.body.referralId) {
      await Referral.findByIdAndUpdate(req.body.referralId, {
        status: 'applied',
        updatedAt: Date.now(),
      });
    }

    res.status(201).json(newApplicant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all applicants for a job
router.get('/jobs/:jobId/applicants', async (req, res) => {
  try {
    const applicants = await Applicant.find({ jobId: req.params.jobId })
      .populate('referredBy', 'fullName email')
      .sort({ appliedAt: -1 });

    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update applicant status
router.put('/applicants/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: Date.now() },
      { new: true }
    );

    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    res.json(applicant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ===== REFERRAL ROUTES =====

// Submit referral
router.post('/refer', async (req, res) => {
  const referral = new Referral({
    jobId: req.body.jobId,
    referrerId: req.body.referrerId,
    referreeName: req.body.referreeName,
    referreeEmail: req.body.referreeEmail,
    referreePhone: req.body.referreePhone,
    message: req.body.message,
    status: 'pending',
  });

  try {
    const newReferral = await referral.save();
    res.status(201).json(newReferral);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get referrals by referrer
router.get('/referrals/:referrerId', async (req, res) => {
  try {
    const referrals = await Referral.find({ referrerId: req.params.referrerId })
      .populate('jobId', 'title company')
      .sort({ createdAt: -1 });

    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get referrals for a job
router.get('/jobs/:jobId/referrals', async (req, res) => {
  try {
    const referrals = await Referral.find({ jobId: req.params.jobId })
      .populate('referrerId', 'fullName email')
      .sort({ createdAt: -1 });

    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update referral status
router.put('/referrals/:id', async (req, res) => {
  try {
    const referral = await Referral.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: Date.now() },
      { new: true }
    );

    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    res.json(referral);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get referral stats
router.get('/referral-stats/:referrerId', async (req, res) => {
  try {
    const stats = await Referral.aggregate([
      { $match: { referrerId: require('mongoose').Types.ObjectId(req.params.referrerId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalBonus = await Referral.aggregate([
      { $match: { referrerId: require('mongoose').Types.ObjectId(req.params.referrerId) } },
      {
        $group: {
          _id: null,
          totalBonus: { $sum: '$referralBonus' },
        },
      },
    ]);

    res.json({
      stats,
      totalBonus: totalBonus[0]?.totalBonus || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

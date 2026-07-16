const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: path.join(__dirname, '..', '..', 'uploads') });
const router = express.Router();

// Public-facing application endpoint
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const { fullName, email, phone, position } = req.body;

    if (!fullName || !email || !position) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In production: save to DB and move file to secure storage (S3). Here we save minimal metadata to a JSON file for demo.
    const applicationsDir = path.join(__dirname, '..', '..', 'data');
    if (!fs.existsSync(applicationsDir)) fs.mkdirSync(applicationsDir, { recursive: true });

    const applicationsFile = path.join(applicationsDir, 'applications.json');
    let apps = [];
    if (fs.existsSync(applicationsFile)) {
      try { apps = JSON.parse(fs.readFileSync(applicationsFile)); } catch(e){ apps = []; }
    }

    const newApp = {
      id: Date.now(),
      fullName,
      email,
      phone,
      position,
      resume: req.file ? req.file.filename : null,
      createdAt: new Date().toISOString(),
    };

    apps.push(newApp);
    fs.writeFileSync(applicationsFile, JSON.stringify(apps, null, 2));

    // Respond success (optionally send confirmation email here)
    return res.status(201).json({ success: true, message: 'Application received' });
  } catch (err) {
    console.error('Error handling /apply', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

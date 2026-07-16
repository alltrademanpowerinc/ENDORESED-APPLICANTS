# Endorsed Applicants Tracking & Referral System

## Overview
This is a complete job tracking and referral management system built with:
- **Frontend**: React + TypeScript with CSS Modules
- **Backend**: Node.js + Express + MongoDB
- **Features**: Job listings, application tracking, referral management, and performance analytics

## Setup Instructions

### Prerequisites
- Node.js 20.x
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables** (create `.env`):
```env
MONGODB_URI=mongodb://localhost:27017/endorsed-applicants
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

3. **Start the server**:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

The React components are located in `src/components/`:
- `JobList.tsx` - Main job listing component
- `JobCard.tsx` - Individual job card component
- `job-list.module.css` - Styles

### API Endpoints

#### Jobs
- `GET /api/tracking/jobs` - Get all jobs (with optional filters)
- `GET /api/tracking/jobs/:id` - Get job details with referral/applicant counts
- `POST /api/tracking/jobs` - Create new job
- `PUT /api/tracking/jobs/:id` - Update job

#### Applications
- `POST /api/tracking/apply` - Submit job application
- `GET /api/tracking/jobs/:jobId/applicants` - Get all applicants for a job
- `PUT /api/tracking/applicants/:id` - Update applicant status

#### Referrals
- `POST /api/tracking/refer` - Submit referral
- `GET /api/tracking/referrals/:referrerId` - Get user's referrals
- `GET /api/tracking/jobs/:jobId/referrals` - Get referrals for a job
- `PUT /api/tracking/referrals/:id` - Update referral status
- `GET /api/tracking/referral-stats/:referrerId` - Get referral stats and bonuses

## Database Models

### Job
```javascript
{
  title: String,
  company: String,
  location: String,
  salary: String,
  description: String,
  status: 'open' | 'filled' | 'closed',
  createdAt: Date,
  updatedAt: Date
}
```

### Applicant
```javascript
{
  jobId: ObjectId,
  fullName: String,
  email: String,
  phone: String,
  resume: String (URL),
  status: 'applied' | 'interviewed' | 'offered' | 'hired' | 'rejected',
  referredBy: ObjectId (optional),
  appliedAt: Date,
  updatedAt: Date
}
```

### Referral
```javascript
{
  jobId: ObjectId,
  referrerId: ObjectId,
  referreeName: String,
  referreeEmail: String,
  referreePhone: String,
  message: String,
  status: 'pending' | 'accepted' | 'rejected' | 'applied',
  referralBonus: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Example

### Get all open jobs
```bash
curl http://localhost:5000/api/tracking/jobs?status=open
```

### Submit an application
```bash
curl -X POST http://localhost:5000/api/tracking/apply \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "job_id_here",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "resume": "https://example.com/resume.pdf"
  }'
```

### Submit a referral
```bash
curl -X POST http://localhost:5000/api/tracking/refer \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "job_id_here",
    "referrerId": "user_id_here",
    "referreeName": "Jane Smith",
    "referreeEmail": "jane@example.com",
    "referreePhone": "555-5678",
    "message": "Great candidate for this role!"
  }'
```

## Features

✅ **Job Management** - Create, update, and filter jobs
✅ **Application Tracking** - Track applicant status through hiring pipeline
✅ **Referral System** - Submit and track referrals with bonus tracking
✅ **Analytics** - View referral stats and performance metrics
✅ **Search & Filter** - Find jobs by title, company, or location
✅ **Status Updates** - Track applicants and referrals through workflow

## File Structure
```
├── server/
│   ├── models/
│   │   ├── Job.js
│   │   ├── Applicant.js
│   │   └── Referral.js
│   ├── routes/
│   │   ├── tracking.js
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   ├── applications.js
│   │   └── candidates.js
│   └── server.js
├── src/
│   └── components/
│       ├── JobList.tsx
│       ├── JobCard.tsx
│       └── job-list.module.css
└── package.json
```

## Next Steps

1. ✅ Set up MongoDB connection
2. ✅ Deploy backend API
3. ⏳ Integrate React components into frontend app
4. ⏳ Add authentication middleware
5. ⏳ Add email notifications for referrals
6. ⏳ Create admin dashboard for management
7. ⏳ Add referral bonus payment system

## Support
For issues or questions, open an issue on the GitHub repository.

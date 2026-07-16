# API Quick Reference

## Base URL
```
http://localhost:5000/api/tracking
```

---

## 🏢 Jobs API

### Get All Jobs
```http
GET /jobs
```
**Query Parameters:**
- `status` - Filter by status (open, filled, closed)
- `search` - Search by title, company, or description

**Example:**
```bash
GET /jobs?status=open&search=engineer
```

**Response:**
```json
[
  {
    "_id": "job_123",
    "title": "Software Engineer",
    "company": "TechCorp",
    "location": "New York, NY",
    "salary": "$120k-$150k",
    "description": "...",
    "status": "open",
    "createdAt": "2026-07-16T10:00:00Z"
  }
]
```

---

### Get Job Details
```http
GET /jobs/:id
```

**Response:**
```json
{
  "_id": "job_123",
  "title": "Software Engineer",
  "company": "TechCorp",
  "location": "New York, NY",
  "salary": "$120k-$150k",
  "description": "...",
  "status": "open",
  "referralCount": 5,
  "applicantCount": 12,
  "createdAt": "2026-07-16T10:00:00Z"
}
```

---

### Create Job
```http
POST /jobs
Content-Type: application/json

{
  "title": "Software Engineer",
  "company": "TechCorp",
  "location": "New York, NY",
  "salary": "$120k-$150k",
  "description": "Join our engineering team...",
  "status": "open"
}
```

**Response:** `201 Created`

---

### Update Job
```http
PUT /jobs/:id
Content-Type: application/json

{
  "status": "filled",
  "salary": "$130k-$160k"
}
```

**Response:** `200 OK` with updated job object

---

## 👤 Applications API

### Submit Application
```http
POST /apply
Content-Type: application/json

{
  "jobId": "job_123",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "resume": "https://example.com/resume.pdf",
  "referralId": "ref_456" (optional)
}
```

**Response:** `201 Created`
```json
{
  "_id": "applicant_789",
  "jobId": "job_123",
  "fullName": "John Doe",
  "email": "john@example.com",
  "status": "applied",
  "appliedAt": "2026-07-16T10:30:00Z"
}
```

---

### Get Applicants for Job
```http
GET /jobs/:jobId/applicants
```

**Response:**
```json
[
  {
    "_id": "applicant_789",
    "jobId": "job_123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "status": "applied",
    "referredBy": {
      "fullName": "Jane Smith",
      "email": "jane@example.com"
    },
    "appliedAt": "2026-07-16T10:30:00Z"
  }
]
```

---

### Update Applicant Status
```http
PUT /applicants/:id
Content-Type: application/json

{
  "status": "interviewed"
}
```

**Valid Statuses:** `applied` → `interviewed` → `offered` → `hired` / `rejected`

---

## 🎯 Referrals API

### Submit Referral
```http
POST /refer
Content-Type: application/json

{
  "jobId": "job_123",
  "referrerId": "user_456",
  "referreeName": "Jane Smith",
  "referreeEmail": "jane@example.com",
  "referreePhone": "555-5678",
  "message": "Great candidate for this role!"
}
```

**Response:** `201 Created`
```json
{
  "_id": "referral_abc",
  "jobId": "job_123",
  "referrerId": "user_456",
  "referreeName": "Jane Smith",
  "referreeEmail": "jane@example.com",
  "status": "pending",
  "referralBonus": 0,
  "createdAt": "2026-07-16T10:45:00Z"
}
```

---

### Get User's Referrals
```http
GET /referrals/:referrerId
```

**Response:**
```json
[
  {
    "_id": "referral_abc",
    "jobId": {
      "title": "Software Engineer",
      "company": "TechCorp"
    },
    "referreeName": "Jane Smith",
    "referreeEmail": "jane@example.com",
    "status": "pending",
    "referralBonus": 0,
    "createdAt": "2026-07-16T10:45:00Z"
  }
]
```

---

### Get Referrals for Job
```http
GET /jobs/:jobId/referrals
```

**Response:** Array of referrals with referrer details

---

### Update Referral Status
```http
PUT /referrals/:id
Content-Type: application/json

{
  "status": "accepted"
}
```

**Valid Statuses:** `pending` → `accepted` / `rejected` → `applied`

---

### Get Referral Stats
```http
GET /referral-stats/:referrerId
```

**Response:**
```json
{
  "stats": [
    { "_id": "pending", "count": 3 },
    { "_id": "accepted", "count": 2 },
    { "_id": "applied", "count": 1 }
  ],
  "totalBonus": 1500
}
```

---

## 🔍 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success (GET, PUT) |
| 201 | Created (POST) |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Server Error |

---

## 📊 Common Use Cases

### Track a Referral Through Completion
1. **Submit referral:**
   ```bash
   POST /refer
   ```

2. **Check referral status:**
   ```bash
   GET /referrals/:referrerId
   ```

3. **Applicant applies:**
   ```bash
   POST /apply
   ```

4. **Update referral status:**
   ```bash
   PUT /referrals/:id (status: "applied")
   ```

5. **Update applicant status:**
   ```bash
   PUT /applicants/:id (status: "hired")
   ```

6. **View referral stats:**
   ```bash
   GET /referral-stats/:referrerId
   ```

---

## 💡 Tips

- All timestamps are in ISO 8601 format (UTC)
- Object IDs are MongoDB ObjectId format
- Most endpoints support sorting by `createdAt` (default: newest first)
- Use pagination for large datasets (add limit/skip parameters as needed)
- Always validate email format on client side before sending

---

## 🧪 Test with cURL

```bash
# Get all open jobs
curl http://localhost:5000/api/tracking/jobs?status=open

# Create a job
curl -X POST http://localhost:5000/api/tracking/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "DevOps Engineer",
    "company": "CloudTech",
    "location": "San Francisco, CA",
    "salary": "$150k-$180k",
    "description": "Looking for experienced DevOps engineer"
  }'

# Submit referral
curl -X POST http://localhost:5000/api/tracking/refer \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "PASTE_JOB_ID",
    "referrerId": "PASTE_USER_ID",
    "referreeName": "Alex Johnson",
    "referreeEmail": "alex@example.com",
    "referreePhone": "555-9999",
    "message": "Excellent candidate!"
  }'
```

---

**Version:** 1.0
**Last Updated:** 2026-07-16

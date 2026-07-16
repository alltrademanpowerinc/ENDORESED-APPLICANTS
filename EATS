# Endorsed Applicants - Recruitment Portal

A modern applicant tracking system (ATS) built with Node.js, Express, and MongoDB for managing job postings, candidates, and applications.

## Features

✅ **Job Management**
- Create, read, update, and delete job postings
- Track job status (Open, Closed, On Hold)
- Monitor applications and hiring progress

✅ **Candidate Management**
- Store candidate information and resumes
- Track candidate status through hiring pipeline
- Manage candidate skills and experience

✅ **Application Tracking**
- Submit and track applications
- Update application status (Draft → Submitted → In Review → Shortlisted → Accepted/Rejected)
- Review and rate candidates

✅ **User Authentication**
- JWT-based authentication
- Role-based access control (Recruiter, Admin, Candidate)
- Secure password management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Azure Web Apps
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alltrademanpowerinc/ENDORESED-APPLICANTS.git
cd ENDORESED-APPLICANTS
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

5. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get specific job
- `POST /api/jobs` - Create new job (protected)
- `PUT /api/jobs/:id` - Update job (protected)
- `DELETE /api/jobs/:id` - Delete job (protected)

### Candidates
- `GET /api/candidates` - Get all candidates (protected)
- `GET /api/candidates/:id` - Get specific candidate (protected)
- `POST /api/candidates` - Create new candidate (protected)
- `PUT /api/candidates/:id` - Update candidate (protected)
- `DELETE /api/candidates/:id` - Delete candidate (protected)

### Applications
- `GET /api/applications` - Get all applications (protected)
- `GET /api/applications/:id` - Get specific application (protected)
- `POST /api/applications` - Create new application (protected)
- `PUT /api/applications/:id` - Update application (protected)
- `PUT /api/applications/:id/submit` - Submit application (protected)

## Testing the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get All Jobs
```bash
curl http://localhost:5000/api/jobs
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "recruiter"
  }'
```

## Project Structure

```
server/
├── config/
│   └── db.js                 # Database configuration
├── models/
│   ├── User.js              # User model
│   ├── JobPosting.js        # Job posting model
│   ├── Candidate.js         # Candidate model
│   └── Application.js       # Application model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── jobs.js              # Job management routes
│   ├── candidates.js        # Candidate management routes
│   └── applications.js      # Application management routes
├── middleware/
│   └── auth.js              # Authentication middleware
└── server.js                # Main server file
```

## Deployment

### Azure Deployment

The project includes a GitHub Actions workflow (`.github/workflows/azure-webapps-node.yml`) for automated deployment to Azure Web Apps.

**Setup Steps:**

1. Create an Azure Web App for Node.js
2. Download the publish profile from Azure Portal
3. Add it as a repository secret: `AZURE_WEBAPP_PUBLISH_PROFILE`
4. Update the workflow environment variables
5. Push to the `ENDORSED_APPLICANT_TRACKING_SYSTEM` branch to trigger deployment

## Environment Variables

Create a `.env` file based on `.env.example`:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/endorsed-applicants
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
AZURE_WEBAPP_NAME=your-app-name
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT License - feel free to use this project for your needs

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Built with ❤️ for the recruitment community**

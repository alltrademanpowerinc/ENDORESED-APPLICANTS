# Applicant Tracking System - Complete Setup Guide

## Phase 1: Backend Setup (Completed ✅)

Your backend is now ready with:
- ✅ Express.js server
- ✅ Database models (User, Job, Candidate, Application)
- ✅ Authentication routes (Register, Login)
- ✅ Job management API
- ✅ Candidate management API
- ✅ Application tracking API

## Phase 2: MongoDB Connection

### Option A: Local MongoDB

1. Install MongoDB Community Edition
   - Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
   - Mac: `brew tap mongodb/brew && brew install mongodb-community`
   - Linux: https://docs.mongodb.com/manual/installation/

2. Start MongoDB:
   ```bash
   # Windows
   mongod
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address
5. Copy connection string
6. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/endorsed-applicants
   ```

## Phase 3: Run the Server

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your configuration

4. Start development server:
   ```bash
   npm run dev
   ```

5. Test the server:
   ```bash
   curl http://localhost:5000/api/health
   ```

## Phase 4: Test API Endpoints

### 1. Register a Recruiter
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john@example.com",
    "password": "SecurePass123",
    "role": "recruiter"
  }'
```

Save the token from response.

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### 3. View All Jobs (No auth needed)
```bash
curl http://localhost:5000/api/jobs
```

### 4. Create New Job (Need token)
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Store Manager",
    "location": "Cebu",
    "type": "Concession",
    "description": "Managing retail store operations",
    "shortfalls": 2
  }'
```

### 5. Get All Candidates (Protected)
```bash
curl http://localhost:5000/api/candidates \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Create New Candidate
```bash
curl -X POST http://localhost:5000/api/candidates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "firstName": "Pedro",
    "lastName": "Garcia",
    "email": "pedro@example.com",
    "phone": "+63-9XX-XXX-XXXX",
    "location": "Manila",
    "experience": 3,
    "skills": ["Sales", "Customer Service", "Microsoft Office"]
  }'
```

## Phase 5: Frontend Development (Next Steps)

When ready to build the React frontend:

1. Create React app:
   ```bash
   npx create-react-app client
   ```

2. Install frontend dependencies:
   ```bash
   cd client
   npm install axios react-router-dom
   ```

3. Create components for:
   - Dashboard
   - Job Listings
   - Candidate Management
   - Application Tracking
   - User Authentication

4. Connect to API endpoints

## Phase 6: Deploy to Azure

1. **Setup Azure Web App:**
   ```bash
   # Install Azure CLI
   # Create resource group
   az group create --name myResourceGroup --location eastus
   
   # Create App Service plan
   az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku F1 --is-linux
   
   # Create web app
   az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name your-app-name --runtime "NODE|20"
   ```

2. **Configure GitHub Actions:**
   - Download publish profile from Azure Portal
   - Add to GitHub Secrets as `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Update workflow environment variables

3. **Deploy:**
   ```bash
   git push origin ENDORSED_APPLICANT_TRACKING_SYSTEM
   ```

## Troubleshooting

### Issue: MongoDB Connection Error
**Solution:** 
- Check MongoDB is running
- Verify connection string in `.env`
- Ensure IP whitelist includes your machine

### Issue: Port Already in Use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: JWT Token Expired
**Solution:** Login again to get a new token

## Next Steps

1. ✅ Backend API - DONE
2. 📝 Frontend UI - Coming soon
3. 🗄️ MongoDB setup - Do this next
4. 🧪 Test endpoints - Try Phase 4 above
5. 🚀 Deploy to Azure - When ready

## Helpful Resources

- Express.js Docs: https://expressjs.com/
- MongoDB Docs: https://docs.mongodb.com/
- JWT Auth: https://jwt.io/
- Azure Node.js: https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs

---

**Your ATS backend is ready! Start with Phase 3 and test the API endpoints.**

# Publishing the public candidate form via GitHub Pages

This document explains how to create a public repository and publish the candidate-facing application page using GitHub Pages. After publishing, update PUBLIC_SUBMISSION_INSTRUCTIONS.md with the PUBLIC_FORM_URL shown below.

Recommended URL (will work after you create the repo and enable Pages):
https://alltrademanpowerinc.github.io/ENDORESED-APPLICANTS-PUBLIC/apply

Steps

1) Build the client (from repository root)

   cd client
   npm install
   npm run build

2) Create a new public repository to host the built static site

   gh repo create alltrademanpowerinc/ENDORESED-APPLICANTS-PUBLIC --public --confirm --source=client/build --remote=origin

   # If you don't have gh installed, create the repo on GitHub web and push the build/ directory:
   # git init
   # git add .
   # git commit -m "Initial site"
   # git branch -M main
   # git remote add origin https://github.com/alltrademanpowerinc/ENDORESED-APPLICANTS-PUBLIC.git
   # git push -u origin main

3) Enable GitHub Pages in the new repository

   - In the repo Settings -> Pages, select branch: main (or gh-pages) and folder: / (root) or /docs if you used that.
   - Save. The Pages URL will be: https://alltrademanpowerinc.github.io/ENDORESED-APPLICANTS-PUBLIC/

4) Confirm the public form URL

   - Once Pages is live, the form page will be available at:
     https://alltrademanpowerinc.github.io/ENDORESED-APPLICANTS-PUBLIC/apply

   - Update PUBLIC_SUBMISSION_INSTRUCTIONS.md in the private repo to replace the placeholder PUBLIC_FORM_URL with the actual URL above.

Notes & security

- The static site will be public. Do NOT include any candidate PII in the static files. The form posts to your backend endpoint at `/api/tracking/apply`.
- If your API is hosted at a different origin (not same domain), configure CORS on the backend to accept requests from the Pages origin.
- For production resume storage, upload files to S3 or similar and never keep them on the public repo.

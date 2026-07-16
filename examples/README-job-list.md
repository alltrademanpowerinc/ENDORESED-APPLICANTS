# JobList Component (TypeScript)

Files added:
- src/components/JobList.tsx
- src/components/JobCard.tsx
- src/components/job-list.module.css
- src/components/job-list.css
- src/components/JobList.styled.tsx

Usage (CSS Module):
1. Import `JobList` into a page:
   ```tsx
   import JobList from 'src/components/JobList';
   <JobList jobs={jobs} />
   ```

2. To use the plain CSS file instead, import `job-list.css` in your root (index.tsx) and remove CSS Module import.

3. For Tailwind:
   - Use the markup in `JobList.tsx` and replace classnames with Tailwind utilities. I can provide a Tailwind-ready file on request.

Notes:
- The CSS Module is the default import in `JobList.tsx` (job-list.module.css). If your project doesn't support CSS Modules, import `job-list.css` globally and change the component accordingly.
- The styled-components variant (`JobList.styled.tsx`) requires `styled-components` and appropriate TypeScript types (`npm install styled-components @types/styled-components`).

Next steps I can do for you:
- Open a PR from branch `feature/joblist-tsx` into your default branch.
- Add a preview/demo page under `examples/` that mounts the component with sample data.


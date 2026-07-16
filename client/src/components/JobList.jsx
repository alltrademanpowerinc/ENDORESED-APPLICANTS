import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import './job-list.module.css';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (data && data.data) setJobs(data.data);
      })
      .catch(err => console.error('Failed to load jobs', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading jobs…</div>;

  return (
    <section className="job-list">
      <div className="notice-box">
        <h2>Candidate application link</h2>
        <p>Share this with your candidates so they fill in the full application themselves — it lands in My submissions as a draft for you to review, then Submit to RCC.</p>
        <div className="notice-actions">
          <button className="primary">APPLICATION — Copy link</button>
          <button className="ghost">Preview</button>
        </div>
      </div>

      <div className="tabs">
        <button className="tab active">Open positions ({jobs.length})</button>
        <button className="tab">My submissions (24)</button>
      </div>

      <div className="cards">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}

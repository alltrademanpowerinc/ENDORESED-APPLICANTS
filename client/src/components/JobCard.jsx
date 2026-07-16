import React, { useState } from 'react';
import SubmitModal from './SubmitModal';
import './job-list.module.css';

export default function JobCard({ job }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="job-card">
      <div className="job-info">
        <h3>{job.title}</h3>
        <div className="meta">{job.location} · {job.type} · <span className="posted">Posted {new Date(job.postedDate).toLocaleDateString()}</span></div>
      </div>
      <div className="job-actions">
        <div className="badges">
          <span className="badge green">{job.shortfalls} shortfall</span>
          <span className="badge light">{job.inReview} in review</span>
        </div>
        <button className="submit-btn" onClick={() => setOpen(true)}>Submit a candidate</button>
      </div>
      {open && <SubmitModal job={job} onClose={() => setOpen(false)} />}
    </div>
  );
}

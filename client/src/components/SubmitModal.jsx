import React, { useState } from 'react';
import './job-list.module.css';

export default function SubmitModal({ job, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const fd = new FormData();
      fd.append('jobId', job.id);
      fd.append('fullName', fullName);
      fd.append('email', email);
      fd.append('phone', phone);
      if (resume) fd.append('resume', resume);

      // Endpoint: adjust if your API expects a different path. Setup guide suggests /api/tracking/apply
      const res = await fetch('/api/tracking/apply', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Submission failed');
      }

      setMessage('Candidate submitted successfully.');
      setFullName(''); setEmail(''); setPhone(''); setResume(null);
    } catch (err) {
      console.error(err);
      setMessage('Failed to submit candidate.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal-header">
          <h2>Submit candidate for {job.title}</h2>
          <button className="close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Full name
            <input required value={fullName} onChange={e => setFullName(e.target.value)} />
          </label>

          <label>
            Email
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </label>

          <label>
            Phone
            <input required value={phone} onChange={e => setPhone(e.target.value)} />
          </label>

          <label>
            Resume (PDF/DOCX)
            <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files[0])} />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit candidate'}</button>
          </div>

          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

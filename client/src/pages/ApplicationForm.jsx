import React, { useState, useRef, useEffect } from 'react';
import '../../index.css';

export default function ApplicationForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [resume, setResume] = useState(null);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const statusRef = useRef();

  useEffect(() => {
    if (message) statusRef.current?.focus();
  }, [message]);

  const validate = () => {
    if (!fullName.trim()) return 'Please enter full name';
    if (!email.trim()) return 'Please enter an email';
    if (!position.trim()) return 'Please select the position';
    if (!consent) return 'Please give consent to process your application';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setMessage({ type: 'error', text: err }); return; }

    setSubmitting(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append('fullName', fullName);
      fd.append('email', email);
      fd.append('phone', phone);
      fd.append('position', position);
      if (resume) fd.append('resume', resume);

      const res = await fetch('/api/tracking/apply', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Submission failed');
      }

      setMessage({ type: 'success', text: 'Thank you — your application was submitted.' });
      setFullName(''); setEmail(''); setPhone(''); setPosition(''); setResume(null); setConsent(false);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to submit application. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="apply-page container" aria-labelledby="apply-title">
      <div className="apply-panel">
        <h1 id="apply-title">Candidate application</h1>
        <p className="lead">Complete the form below. Attach resume (PDF preferred). For assistance: alltrademanpowerinc.recruitment@gmail.com</p>

        <form onSubmit={handleSubmit} className="apply-form" noValidate>
          <label>
            Full name
            <input value={fullName} onChange={e => setFullName(e.target.value)} required aria-required="true" />
          </label>

          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required aria-required="true" />
          </label>

          <label>
            Phone
            <input value={phone} onChange={e => setPhone(e.target.value)} aria-describedby="phone-help" />
            <small id="phone-help">International format preferred (e.g., +63-9xx-xxx-xxxx)</small>
          </label>

          <label>
            Position applied for
            <input value={position} onChange={e => setPosition(e.target.value)} required aria-required="true" />
          </label>

          <label>
            Resume (PDF, DOCX)
            <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={e => setResume(e.target.files[0])} />
          </label>

          <label className="consent">
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
            I consent to the processing of my personal data for recruitment purposes.
          </label>

          <div className="form-actions">
            <button type="submit" className="btn primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit application'}
            </button>
          </div>

          <div
            tabIndex="-1"
            ref={statusRef}
            role="status"
            aria-live="polite"
            className={`form-message ${message?.type || ''}`}
          >
            {message?.text}
          </div>
        </form>
      </div>
    </main>
  );
}

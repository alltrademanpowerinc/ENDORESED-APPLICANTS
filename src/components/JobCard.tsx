import React from 'react';
import styles from './job-list.module.css';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  status?: 'open' | 'filled' | 'closed';
  referralCount?: number;
}

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onRefer?: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onRefer }) => {
  return (
    <div className={styles.jobCard}>
      <div className={styles.jobHeader}>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <span className={`${styles.status} ${styles[`status-${job.status}`]}`}>
          {job.status || 'open'}
        </span>
      </div>

      <div className={styles.jobMeta}>
        <p className={styles.company}>{job.company}</p>
        <p className={styles.location}>📍 {job.location}</p>
      </div>

      {job.salary && (
        <p className={styles.salary}>💰 {job.salary}</p>
      )}

      <p className={styles.description}>{job.description}</p>

      {job.referralCount !== undefined && (
        <p className={styles.referralInfo}>
          👥 {job.referralCount} referral{job.referralCount !== 1 ? 's' : ''}
        </p>
      )}

      <div className={styles.actions}>
        <button
          className={styles.applyBtn}
          onClick={() => onApply?.(job.id)}
        >
          Apply Now
        </button>
        <button
          className={styles.referBtn}
          onClick={() => onRefer?.(job.id)}
        >
          Refer Someone
        </button>
      </div>
    </div>
  );
};

export default JobCard;

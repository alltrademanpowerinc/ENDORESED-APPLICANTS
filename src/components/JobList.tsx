import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
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

interface JobListProps {
  jobs?: Job[];
  loading?: boolean;
  onApply?: (jobId: string) => void;
  onRefer?: (jobId: string) => void;
  filterStatus?: 'all' | 'open' | 'filled' | 'closed';
}

export const JobList: React.FC<JobListProps> = ({
  jobs = [],
  loading = false,
  onApply,
  onRefer,
  filterStatus = 'all',
}) => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.status === filterStatus));
    }
  }, [jobs, filterStatus]);

  if (loading) {
    return <div className={styles.loading}>Loading jobs...</div>;
  }

  if (!filteredJobs.length) {
    return <div className={styles.empty}>No jobs available</div>;
  }

  return (
    <div className={styles.jobListContainer}>
      <h2 className={styles.heading}>Available Jobs</h2>
      <div className={styles.jobList}>
        {filteredJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            onApply={onApply}
            onRefer={onRefer}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;

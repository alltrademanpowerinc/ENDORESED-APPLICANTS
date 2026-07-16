import React from "react";
import JobCard, { Pill } from "./JobCard";
import styles from "./job-list.module.css";

/**
 * Example props:
 * jobs = [{ title, meta, pills }]
 */
export interface JobItem {
  title: string;
  meta: string;
  pills?: Pill[];
}

export interface JobListProps {
  jobs?: JobItem[];
  className?: string;
}

const defaultJobs: JobItem[] = [
  { title: "Gaisano Mall Davao", meta: "Davao · MIN · Company-Op — Posted Jun 18 · Open", pills: [{ text: "1 shortfall" }, { text: "0 in review", type: "blue" }] },
  { title: "Landmark Makati", meta: "Makati · GMA · Concession — Posted Jun 18 · Open", pills: [{ text: "1 shortfall" }, { text: "1 in review · 1 Jell-on", type: "blue" }] },
];

export const JobList: React.FC<JobListProps> = ({ jobs = defaultJobs, className }) => {
  return (
    <div className={className ?? styles.page}>
      <header className={styles.topbar}>
        <div className={styles.wrap}>
          <h1>RCC Merchandiser Openings</h1>
          <p>Jell-on · 39 stores · 50 open positions · 14 candidates in process · 14 from Jell-on</p>
        </div>
      </header>

      <main className={styles.wrap}>
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.callout} role="note">
              <div className={styles.title}>Candidate application link</div>
              <div>
                Share this with your candidates so they fill in the full application themselves — it lands in My submissions as a draft for you to review, then Submit to RCC.
              </div>
              <div className={styles.controls}>
                <button className={`btn btn-primary`} onClick={() => navigator.clipboard?.writeText(window.location.href)}>APPLICATION — Copy link</button>
                <button className={`btn btn-ghost`}>Preview</button>
              </div>
            </div>

            <div className={styles.tabs} role="tablist">
              <div className={`${styles.tab} ${styles.active}`}>Open positions (50)</div>
              <div className={styles.tab}>My submissions (24)</div>
            </div>

            <div className={styles.jobList}>
              {jobs.map((j, i) => (
                <JobCard
                  key={i}
                  title={j.title}
                  meta={j.meta}
                  pills={j.pills}
                  onSubmit={() => alert(`Submit candidate for ${j.title}`)}
                  className={styles.jobCard}
                />
              ))}
            </div>
          </div>

          <aside style={{ width: 260 }} />
        </div>
      </main>
    </div>
  );
};

export default JobList;

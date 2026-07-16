import React from "react";

export type Pill = { text: string; type?: "green" | "blue" };

export interface JobCardProps {
  title: string;
  meta: string;
  pills?: Pill[];
  onSubmit?: () => void;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({ title, meta, pills = [], onSubmit, className }) => {
  return (
    <div className={className ?? "job-card"}>
      <div className="job-left">
        <div className="job-title" title={title}>{title}</div>
        <div className="job-meta">{meta}</div>
      </div>

      <div className="job-right">
        <div className="meta-row" aria-hidden="true">
          {pills.map((p, i) => (
            <div key={i} className={`pill ${p.type ?? "green"}`}>{p.text}</div>
          ))}
        </div>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            onSubmit?.();
          }}
        >
          Submit a candidate
        </button>
      </div>
    </div>
  );
};

export default JobCard;

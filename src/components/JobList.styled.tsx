import React from "react";
import styled from "styled-components";
import JobCard, { Pill } from "./JobCard";

const Page = styled.div`
  --navy: #0f314b;
  background: #f3f6f7;
  min-height: 100vh;
  color: #17262f;
`;

const Container = styled.div`
  padding: 24px;
`;

export const JobListStyled: React.FC<{ jobs?: { title: string; meta: string; pills?: Pill[] }[] }> = ({ jobs = [] }) => {
  return (
    <Page>
      <Container>
        {jobs.map((j, i) => (
          <JobCard key={i} title={j.title} meta={j.meta} pills={j.pills}/>
        ))}
      </Container>
    </Page>
  );
};

export default JobListStyled;

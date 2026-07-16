import React from 'react';
import JobList from './components/JobList';
import './index.css';

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-inner">
          <h1>RCC Merchandiser Openings</h1>
          <p className="sub">Jell-on · 39 stores · 50 open positions · 14 candidates in process · 14 from Jell-on</p>
        </div>
      </header>
      <main className="container">
        <JobList />
      </main>
    </div>
  );
}

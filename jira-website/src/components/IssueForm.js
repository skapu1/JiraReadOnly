// src/IssueForm.js
import React from 'react';

const IssueForm = ({ onSubmit, onChange, issueKey}) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(issueKey);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Enter Issue Key"
            value={issueKey}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IssueForm;

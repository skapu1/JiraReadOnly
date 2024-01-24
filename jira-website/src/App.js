import React, { useState } from 'react';
import './App.css';
import JiraIssuePanel from './components/issuePannel';
import IssueForm from './components/IssueForm';

function App() {
  const [issueKey, setIssueKey] = useState('');
  const [issueData, setIssueData] = useState(null);

  const fetchIssueData = async (issueKey) => {
    try {
      const response = await fetch('http://localhost:5000/getIssue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issueKey }),
      });
      const data = await response.json();
      console.log(data);
      if("error" in data){
        alert("There is No issue present with this issue key");
      }
      else{
        setIssueData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async(inputValue) => {
    try {
      console.log('Comment added');
      console.log(inputValue);
      const response = await fetch('http://localhost:5000/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issueKey , inputValue }),
      });
      console.log(response);
      fetchIssueData(issueKey);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Get Jira Issue</h1>
      <IssueForm onSubmit={fetchIssueData} onChange={setIssueKey} issueKey={issueKey}/>
      {issueData && (
        <JiraIssuePanel issueData={issueData} handleAddComment={handleAddComment}/>
      )}
    </div>
  );
}

export default App;
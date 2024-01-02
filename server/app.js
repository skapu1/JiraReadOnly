// server/app.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/getIssue', async (req, res) => {
  const { issueKey } = req.body;
  
  const email = 'prodbot@zuora.com';
  const apiToken = 'ATATT3xFfGF0rg_PAfyDUTxhb3Jh3LcHi7qc4uayhFo65w3knvLLisJ4-0CzWgSgdjKJZx3M5BhxH_WIaFAmVPJbr4M1YIutJTfNni4qfHjJxag0Z5u9V65OFrOiQYDJ4N3WZlUmFGnoFeGAtToEcTa_oQOUm9sFNW7WHSnG7nnRZSwMsiRNoQM=8C1DBFAE';
  try {
    const response = await axios.get(`https://zuora-sandbox-383.atlassian.net/rest/api/3/issue/${issueKey}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
        'Accept': 'application/json'
      }
    });

    console.log(`Response: ${response.status} ${response.statusText}`);
    res.json(response.data); // Send the response data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching issue data' });
  }
});

app.post('/addComment', async (req, res) => {
  const { issueKey , inputValue } = req.body;
  const email = 'prodbot@zuora.com';
  const apiToken = 'ATATT3xFfGF0rg_PAfyDUTxhb3Jh3LcHi7qc4uayhFo65w3knvLLisJ4-0CzWgSgdjKJZx3M5BhxH_WIaFAmVPJbr4M1YIutJTfNni4qfHjJxag0Z5u9V65OFrOiQYDJ4N3WZlUmFGnoFeGAtToEcTa_oQOUm9sFNW7WHSnG7nnRZSwMsiRNoQM=8C1DBFAE';
  
  const bodyData = `{
    "body": {
      "content": [
        {
          "content": [
            {
              "text": ${`"${inputValue.replace(/\n/g, ' \\n')}"`},
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    }
  }`;
  console.log(bodyData);
  try {
    const response = await axios.post(`https://zuora-sandbox-383.atlassian.net/rest/api/3/issue/${issueKey}/comment`, bodyData, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    console.log(`Response: ${response.status} ${response.statusText}`);
    res.json(response.data); // Send the response data as JSON
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

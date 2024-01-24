// server/app.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: 'Too many requests from this IP, please try again later.'
});

// Apply the rate limiter to all routes
app.use(cors());
app.use(express.json());
app.use(limiter);

app.post('/getIssue', async (req, res) => {
  const { issueKey } = req.body;
  
  const email = 'skapu@zuora.com';
  const apiToken = 'ATATT3xFfGF0_zet5cP2kLVhKP17eaJy2u48Y2MySnNnebJezkF7-hWZe4nklKHG9iUvhWlEx3HU9W4ePJ-RsFQPl6R_43yzpl4OrSsMiGzboHs8dfmYtubS79tUByUrE6nSgy-OyG9LfukbkH9Oal-fmKlM6oca-V5r83x9t6AW4H0BbSUFrII=E1DA17D5';
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
  const email = 'skapu@zuora.com';
  const apiToken = 'ATATT3xFfGF0_zet5cP2kLVhKP17eaJy2u48Y2MySnNnebJezkF7-hWZe4nklKHG9iUvhWlEx3HU9W4ePJ-RsFQPl6R_43yzpl4OrSsMiGzboHs8dfmYtubS79tUByUrE6nSgy-OyG9LfukbkH9Oal-fmKlM6oca-V5r83x9t6AW4H0BbSUFrII=E1DA17D5';
  
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

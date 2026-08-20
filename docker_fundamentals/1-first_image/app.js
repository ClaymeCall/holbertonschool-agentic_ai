const express = require('express');
const app = express();
const PORT = 3000;

const MESSAGE = process.env.MESSAGE || 'Hello from Node.js!';

app.get('/', (req, res) => {
  res.send(MESSAGE);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// src/server.js
import express from 'express';
import router from './routes.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

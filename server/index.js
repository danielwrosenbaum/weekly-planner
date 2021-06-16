require('dotenv/config');

const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();
const jsonMiddleware = express.json();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.post('/api/weeklyPlanner', (req, res, next) => {
  const { day, time, description } = req.body;
  const sql = `
  insert into "planner" ("day", "time", "description")
  values ($1, $2, $3)
  returning *
  `;
  const params = [day, time, description];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

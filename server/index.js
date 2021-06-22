require('dotenv/config');

const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();
const jsonMiddleware = express.json();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/weeklyPlanner/:dayOfWeek', (req, res, next) => {
  const dayOfWeek = req.params.dayOfWeek;
  const sql = `
  select *
    from "planner"
    where "day" = $1
    order by "indexTime"
  `;
  const params = [dayOfWeek];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/weeklyPlanner', (req, res, next) => {
  const { day, time, description, indexTime } = req.body;
  const sql = `
  insert into "planner" ("day", "time", "description", "indexTime")
  values ($1, $2, $3, $4)
  returning *
  `;
  const params = [day, time, description, indexTime];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.put('/api/weeklyPlanner/:entryId', (req, res, next) => {
  const entryId = req.params.entryId;
  const { day, time, description, indexTime } = req.body;
  const sql = `
  update "planner"
    set "day" = $1,
        "time" = $2,
        "description" = $3,
        "indexTime" = $4
    where "entryId" = $5
    returning *
  `;
  const params = [day, time, description, indexTime, entryId];
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      res.status(201).json(entry);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

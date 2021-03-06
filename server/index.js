require('dotenv/config');

const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();
const jsonMiddleware = express.json();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/weeklyPlanner/:week/:dayOfWeek', (req, res, next) => {
  const week = req.params.week;
  const dayOfWeek = req.params.dayOfWeek;
  const sql = `
  select *
    from "planner"
    where "day" = $1
    and "week" = $2
    order by "indexTime"
  `;
  const params = [dayOfWeek, week];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/weeklyPlanner', (req, res, next) => {
  const { day, time, description, indexTime, location, fullDate, week } = req.body;
  const sql = `
  insert into "planner" ("day", "time", "description", "indexTime", "location", "fullDate", "week")
  values ($1, $2, $3, $4, $5, $6, $7)
  returning *
  `;
  const params = [day, time, description, indexTime, location, fullDate, week];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.put('/api/weeklyPlanner/:entryId', (req, res, next) => {
  const entryId = req.params.entryId;
  const { day, time, description, indexTime, location, fullDate, week } = req.body;
  let sql;
  let params;
  if (fullDate !== 1) {
    sql = `
  update "planner"
    set "day" = $1,
        "time" = $2,
        "description" = $3,
        "indexTime" = $4,
        "location" = $5,
        "fullDate" = $6,
        "week" = $7
    where "entryId" = $8
    returning *
  `;
    params = [day, time, description, indexTime, location, fullDate, week, entryId];
  } else {
    sql = `
  update "planner"
    set "day" = $1,
        "time" = $2,
        "description" = $3,
        "indexTime" = $4,
        "location" = $5,
        "week" = $6,
    where "entryId" = $7
    returning *
  `;
    params = [day, time, description, indexTime, location, week, entryId];
  }

  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      res.status(201).json(entry);
    })
    .catch(err => next(err));
});

app.delete('/api/weeklyPlanner/:entryId', (req, res, next) => {
  const entryId = req.params.entryId;
  const sql = `
  delete from "planner"
    where "entryId" = $1
    returning *
  `;
  const params = [entryId];
  db.query(sql, params)
    .then(result => {
      const entry = result.rows[0];
      if (!entry) {
        res.status(404).json({
          error: `Cannot find entry with ID of ${entryId}, please try again.`
        });
      } else {
        res.status(204).json(entry);
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

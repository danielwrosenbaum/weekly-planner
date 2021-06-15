set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."planner" (
  "entryId"               serial,
  "day"                   text,
  "time"                  text,
  "description"           text,
  "createdAt"             timestamptz(6) default now(),
  primary key ("entryId")
)

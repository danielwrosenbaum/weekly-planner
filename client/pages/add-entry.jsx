import React, { useState } from 'react';
import { startOfWeek, endOfWeek, format, eachDayOfInterval } from 'date-fns';
// import Home from './home';

export default function AddEntry(props) {

  const [dayOfWeek, setDayofWeek] = useState(props.value);
  const [time, setTime] = useState('');
  const [indexTime, setIndexTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [week] = useState(props.weekStart);
  const [dayNumber, setDayNumber] = useState(0);
  const clickedDate = new Date(week);
  const handleCancel = () => {
    props.onClick();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const fullDate = props.date + ', ' + time;
    const entry = {
      day: dayOfWeek,
      fullDate,
      time,
      description,
      indexTime,
      location,
      week
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    };
    fetch('/api/weeklyPlanner', req)
      .then(res => res.json())
      .then(result => {
        props.onClick();
        props.onSubmit();
      });
  };

  function renderDayOfWeekDate(curr, day) {
    const start = startOfWeek(curr);
    const end = endOfWeek(curr);
    const thisWeek = eachDayOfInterval({
      start,
      end
    });
    return thisWeek[day];
  }

  const dateTitle = renderDayOfWeekDate(clickedDate, dayNumber);
  const formatDays = format(dateTitle, 'MM/dd/yyyy');

  const handleDayChange = event => {
    setDayofWeek(event.target.value);
    const e = event.target;
    setDayNumber(e.options[e.selectedIndex].id);
  };

  const handleTimeChange = event => {
    const splitTime = event.target.value.split(':');
    const newArr = [];
    let returnVal;
    newArr.push(splitTime[1]);
    if (splitTime[0] === '12') {
      newArr.unshift(splitTime[0]);
      returnVal = newArr.join(':') + 'PM';
    } else if (splitTime[0] === '00') {
      newArr.unshift('12');
      returnVal = newArr.join(':') + 'AM';
    } else if (splitTime[0] > 12) {
      const newTime = splitTime[0] - '12';
      newArr.unshift(newTime);
      returnVal = newArr.join(':') + 'PM';
    } else {
      newArr.unshift(splitTime[0]);
      returnVal = newArr.join(':') + 'AM';
    }

    setIndexTime(splitTime.join(''));
    setTime(returnVal);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };
  const handleLocationChange = event => {
    setLocation(event.target.value);
  };
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-full">
                <h2>Add Entry</h2>
                <h3>{formatDays}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-full">
                <div className="select-container">
                  <select
                    onChange={handleDayChange}
                    required
                    name="day"
                    value={dayOfWeek}
                  >
                    <option value={''}>--Day of the Week--</option>
                    <option id={0} value={'sunday'}>
                      Sunday
                    </option>
                    <option id={1} value={'monday'}>
                      Monday
                    </option>
                    <option id={2} value={'tuesday'}>
                      Tuesday
                    </option>
                    <option id={3} value={'wednesday'}>
                      Wednesday
                    </option>
                    <option id={4} value={'thursday'}>
                      Thursday
                    </option>
                    <option id={5} value={'friday'}>
                      Friday
                    </option>
                    <option id={6} value={'saturday'}>
                      Saturday
                    </option>
                  </select>
                  <input
                    onChange={handleTimeChange}
                    type="time"
                    required
                    name="time"
                  ></input>
                </div>
                <div className="row pd-one">
                  <div className="col-full">
                    <textarea
                      onChange={handleLocationChange}
                      name="Location"
                      placeholder="Location"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
                <div className="row pd-one">
                  <div className="col-full">
                    <textarea
                      required
                      onChange={handleDescriptionChange}
                      name="description"
                      placeholder="Description"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
                <div className="row pd-one btn-container">
                  <div className="col-full  space-evenly">
                    <button onClick={handleCancel} className="btn-cancel">
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

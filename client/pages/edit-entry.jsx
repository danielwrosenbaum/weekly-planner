import React, { useState } from 'react';
import { startOfWeek, endOfWeek, format, eachDayOfInterval } from 'date-fns';

// import Home from './home';

export default function EditEntry(props) {
  // const [isAddClicked, setIsAddClicked] = useState(props);
  const [dayOfWeek, setDayofWeek] = useState(props.value.day);
  const [time, setTime] = useState(props.value.time);
  const [indexTime, setIndexTime] = useState(props.value.indexTime);
  const [description, setDescription] = useState(props.value.description);
  const [location, setLocation] = useState(props.value.location);
  const [whichDayNumberisClicked, setWhichDayNumberisClicked] = useState(props.dateNumber);

  const handleCancel = () => {
    props.onClick();
  };
  function renderDayOfWeekDate(day) {
    const curr = new Date();
    const start = startOfWeek(curr);
    const end = endOfWeek(curr);
    const thisWeek = eachDayOfInterval({
      start,
      end
    });
    return thisWeek[day];
  }
  const renderDayTitle = format(renderDayOfWeekDate(whichDayNumberisClicked), 'MM/dd/yyyy');

  const handleSubmit = event => {
    event.preventDefault();
    const entryId = props.value.entryId;
    let fullDate;
    if (time !== props.value.time || dayOfWeek !== props.value.day) {
      fullDate = renderDayTitle + ', ' + time;
    } else {
      fullDate = 1;
    }

    const entry = {
      day: dayOfWeek,
      fullDate,
      time,
      description,
      indexTime,
      location
    };
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    };
    fetch(`/api/weeklyPlanner/${entryId}`, req)
      .then(res => res.json())
      .then(result => {
        props.onClick();
        props.onSubmit();
      });
  };

  const handleDayChange = event => {
    const splitValue = event.target.value.split(',');
    const dayName = splitValue[0];
    const dayNum = splitValue[1];
    setDayofWeek(dayName);
    setWhichDayNumberisClicked(dayNum);
  };
  function handleEditTime(time) {
    const newTime = time.substring(0, 2) + ':' + time.substring(2);

    return newTime;

  }
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
                <h2>Edit Entry</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-full">
                <div className="select-container">
                  <select
                    value={dayOfWeek + ',' + whichDayNumberisClicked}
                    onChange={handleDayChange}
                    required
                    name="day">
                    <option value={''}>--Day of the Week--</option>
                    <option value={'sunday,0'}>Sunday</option>
                    <option value={'monday,1'}>Monday</option>
                    <option value={'tuesday,2'}>Tuesday</option>
                    <option value={'wednesday,3'}>Wednesday</option>
                    <option value={'thursday,4'}>Thursday</option>
                    <option value={'friday,5'}>Friday</option>
                    <option value={'saturday,6'}>Saturday</option>
                  </select>
                  <input value={handleEditTime(indexTime)} onChange={handleTimeChange} type="time" required name="time"></input>
                </div>
                <div className="row pd-one">
                  <div className="col-full">
                    <textarea
                      onChange={handleLocationChange}
                      name="Location"
                      placeholder="Location"
                      rows="2"></textarea>
                  </div>
                </div>
                <div className="row pd-one">
                  <div className="col-full">
                    <textarea
                      required
                      value={description}
                      onChange={handleDescriptionChange}
                      name="description"
                      placeholder="Description"
                      rows="5"></textarea>
                  </div>
                </div>
                <div className="row pd-one btn-container">
                  <div className="col-full  space-evenly">
                    <button onClick={handleCancel} className="btn-cancel">Cancel</button>
                    <button type="submit" className="btn-submit">Submit</button>
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

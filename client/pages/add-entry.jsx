import React, { useState } from 'react';
// import Home from './home';

export default function AddEntry(props) {
  // const [isAddClicked, setIsAddClicked] = useState(props);
  const [dayOfWeek, setDayofWeek] = useState('');
  const [time, setTime] = useState('');
  const [indexTime, setIndexTime] = useState('');
  const [description, setDescription] = useState('');

  const handleCancel = () => {
    props.onClick();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const entry = {
      day: dayOfWeek,
      time,
      description,
      indexTime
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
      });
  };

  const handleDayChange = event => {
    setDayofWeek(event.target.value);
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

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-full">
                <h2>Add Entry</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-full">
                <div className="select-container">
                  <select
                    onChange={handleDayChange}
                    required
                    name="day">
                    <option value={''}>--Day of the Week--</option>
                    <option value={'monday'}>Monday</option>
                    <option value={'tuesday'}>Tuesday</option>
                    <option value={'wednesday'}>Wednesday</option>
                    <option value={'thursday'}>Thursday</option>
                    <option value={'friday'}>Friday</option>
                    <option value={'saturday'}>Saturday</option>
                    <option value={'sunday'}>Sunday</option>
                  </select>
                  {/* <select
                    onChange={handleTimeChange}
                    required
                    name="time">
                    <option>--Time--</option>
                    <option>8:00</option>
                    <option>9:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                    <option>1:00</option>
                    <option>2:00</option>
                    <option>3:00</option>
                    <option>4:00</option>
                    <option>5:00</option>
                    <option>6:00</option>
                    <option>7:00</option>
                    <option>8:00</option>
                    <option>9:00</option>
                    <option>10:00</option>
                  </select> */}
                  <input onChange={handleTimeChange} type="time" required name="time"></input>
                </div>
                <div className="row pd-one">
                  <div className="col-full">
                    <textarea
                      required
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

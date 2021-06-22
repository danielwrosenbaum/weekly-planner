import React, { useState } from 'react';
// import Home from './home';

export default function EditEntry(props) {
  // const [isAddClicked, setIsAddClicked] = useState(props);
  const [dayOfWeek, setDayofWeek] = useState(props.value.day);
  const [time, setTime] = useState(props.value.time);
  const [indexTime, setIndexTime] = useState(props.value.indexTime);
  const [description, setDescription] = useState(props.value.description);

  const handleCancel = () => {
    props.onClick();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const entryId = props.value.entryId;
    const entry = {
      day: dayOfWeek,
      time,
      description,
      indexTime
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
    setDayofWeek(event.target.value);
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
                    value={dayOfWeek}
                    onChange={handleDayChange}
                    required
                    name="day">
                    <option value={''}>--Day of the Week--</option>
                    <option value={'sunday'}>Sunday</option>
                    <option value={'monday'}>Monday</option>
                    <option value={'tuesday'}>Tuesday</option>
                    <option value={'wednesday'}>Wednesday</option>
                    <option value={'thursday'}>Thursday</option>
                    <option value={'friday'}>Friday</option>
                    <option value={'saturday'}>Saturday</option>
                  </select>
                  <input value={handleEditTime(indexTime)} onChange={handleTimeChange} type="time" required name="time"></input>
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

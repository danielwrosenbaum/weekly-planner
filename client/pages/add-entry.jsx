import React, { useState } from 'react';
import Home from './home';

export default function AddEntry() {
  const [isAddClicked, setIsAddClicked] = useState(true);
  const [dayOfWeek, setDayofWeek] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  function handleCancel() {
    setIsAddClicked(false);
  }

  const handleSubmit = event => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(time, description, dayOfWeek);
  };

  const handleDayChange = event => {
    setDayofWeek(event.target.value);
  };

  const handleTimeChange = event => {
    setTime(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  if (!isAddClicked) return <Home />;
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
            <div className="row pd-one">
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
                  <select
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
                  </select>
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
                <div className="row pd-one">
                  <div className="col-full btn-container">
                    <button onClick={() => handleCancel()} className="btn-cancel">Cancel</button>
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

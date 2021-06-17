import React, { useState } from 'react';
import AddEntry from './add-entry';

export default function Home(props) {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [whichDayisClicked, setWhichDayisClicked] = useState('sunday');

  const handleClick = event => {
    if (!isAddClicked) {
      setIsAddClicked(true);
    } else {
      setIsAddClicked(false);
    }
  };

  const handleDayClick = event => {
    setWhichDayisClicked(event.target.value);
    // eslint-disable-next-line no-console
    console.log(whichDayisClicked);
  };

  return (
    <>
      <div className="page-container">
        {(isAddClicked) && <AddEntry onClick={handleClick} />}
        <div className="row">
          <div className="col-full centered">
            <h1>Weekly Planner</h1>
          </div>
        </div>
        <div className="day-btns-container">
          <div className="row space-evenly wrap">
            <div className="pd-half align-self-ctr">
              <button value="sunday" onClick={handleDayClick} className="day-btns">Sunday</button>
            </div>
            <div className="pd-half">
              <button value="monday" onClick={handleDayClick} className="day-btns">Monday</button>
            </div>
            <div className="pd-half">
              <button value="tuesday" onClick={handleDayClick} className="day-btns">Tuesday</button>
            </div>
            <div className="pd-half">
              <button value="wednesday" onClick={handleDayClick} className="day-btns">Wednesday</button>
            </div>
            <div className="pd-half">
              <button value="thursday" onClick={handleDayClick} className="day-btns">Thursday</button>
            </div>
            <div className="pd-half">
              <button value="friday" onClick={handleDayClick} className="day-btns">Friday</button>
            </div>
            <div className="pd-half">
              <button value="saturday" onClick={handleDayClick} className="day-btns">Saturday</button>
            </div>
          </div>

        </div>
        <div className="row justify-content-ctr">
          <div className="col-full">
            <div className="btn-container justify-content-ctr">
              <button onClick={handleClick} className="add-btn">Add an Entry</button>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}

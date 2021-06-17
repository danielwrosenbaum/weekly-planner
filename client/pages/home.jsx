import React, { useState, useEffect } from 'react';
import AddEntry from './add-entry';

export default function Home(props) {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [whichDayisClicked, setWhichDayisClicked] = useState('sunday');
  const [data, setData] = useState(null);

  useEffect(() => {
    loadData();
  }, [whichDayisClicked]);

  const handleClick = event => {
    if (!isAddClicked) {
      setIsAddClicked(true);
    } else {
      setIsAddClicked(false);
    }
  };

  const loadData = () => {
    fetch(`/api/weeklyPlanner/${whichDayisClicked}`)
      .then(res => res.json())
      .then(result => {
        setData(result);
      });
  };

  const handleDayClick = event => {
    setWhichDayisClicked(event.target.value);
  };
  function renderDays() {
    if (data) {
      const renderedDays = (
        <tbody>
          {
            data.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{entry.time}</td>
                  <td>{entry.description}</td>
                </tr>
              );
            })
          }
        </tbody>
      );
      return renderedDays;
    }

  }

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
        <div className="container">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Description</th>
              </tr>
            </thead>
{renderDays()}
          </table>
        </div>
    </div>
    </>
  );
}

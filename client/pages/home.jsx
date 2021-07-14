import React, { useState, useEffect } from 'react';
import AddEntry from './add-entry';
import EditEntry from './edit-entry';
import DeleteModal from './delete-modal';
import { startOfWeek, endOfWeek, format } from 'date-fns';

export default function Home(props) {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isEditClicked, setisEditClicked] = useState(false);
  const [isDeleteClicked, setisDeleteClicked] = useState(false);
  const [whichDayisClicked, setWhichDayisClicked] = useState('sunday');
  const [data, setData] = useState(null);
  const [editEntry, seteditEntry] = useState(null);
  const [newData, setNewData] = useState(true);

  useEffect(() => {
    loadData();
  }, [newData, whichDayisClicked, isDeleteClicked]);

  const handleClick = event => {
    if (!isAddClicked) {
      setIsAddClicked(true);
    } else {
      setIsAddClicked(false);
    }
  };

  const handleEdit = event => {
    if (!isEditClicked) {
      setisEditClicked(true);
    } else {
      setisEditClicked(false);
    }
  };

  function handleDelete(obj) {
    if (!isDeleteClicked) {
      setisDeleteClicked(true);
    } else {
      setisDeleteClicked(false);
    }
    seteditEntry(obj);
  }

  function handleEditClick(obj) {
    if (!isEditClicked) {
      setisEditClicked(true);
    } else {
      setisEditClicked(false);
    }
    seteditEntry(obj);
  }
  const handleNewData = event => {
    setNewData(true);
  };

  const loadData = () => {
    fetch(`/api/weeklyPlanner/${whichDayisClicked}`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setNewData(false);
      });
  };
  function renderDates() {
    const curr = new Date();
    // console.log(startOfWeek(curr));

    const start = format(startOfWeek(curr), 'MM/dd/yyyy');
    const end = format(endOfWeek(curr), 'MM/dd/yyyy');
    const justDayDate = format(startOfWeek(curr), 'dd');

    const weekDates = {
      start,
      end,
      justDayDate
    };
    return weekDates;
  }

  const { start, end, justDayDate } = renderDates();
  const renderTitle = whichDayisClicked[0].toUpperCase() + whichDayisClicked.slice(1);
  const renderWeekTitle = start + ' to ' + end;

  const handleDayClick = event => {
    const buttonValue = event.target.closest('button').value;
    setWhichDayisClicked(buttonValue);
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
                  <td></td>
                  <td>{entry.description}</td>
                  <td className="btn-table-row">
                    <button value={entry} onClick={() => handleEditClick(entry)}>Edit</button>
                    <button value={entry} onClick={() => handleDelete(entry)}>Delete</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      );
      return renderedDays;
    } else {
      return null;
    }

  }

  // console.log(renderDates());
  return (
    <>
      <div className="page-container">
        {(isAddClicked) && <AddEntry onClick={handleClick} onSubmit={handleNewData} />}
        {(isEditClicked) && <EditEntry value={editEntry} onClick={handleEdit} onSubmit={handleNewData} />}
        {(isDeleteClicked) && <DeleteModal value={editEntry} onClick={handleDelete} />}
        <div className="row">
          <div className="col-full centered">
            <h2>Weekly Planner</h2>
            <h3>{renderWeekTitle}</h3>
          </div>
        </div>
        <div className="day-btns-container">
          <div className="row space-evenly wrap">
            <div className="pd-qtr">
              <button value="sunday" onClick={handleDayClick} className="day-btns">
                <div>Sunday</div>
                <div>{parseInt(justDayDate)}</div>
                </button>
            </div>
            <div className="pd-qtr">
              <button value="monday" onClick={handleDayClick} className="day-btns">
                <div>Monday</div>
                <div>{parseInt(justDayDate) + 1}</div>
              </button>
            </div>
            <div className="pd-qtr">
              <button value="tuesday" onClick={handleDayClick} className="day-btns">
                <div>Tuesday</div>
                <div>{parseInt(justDayDate) + 2}</div>
              </button>
            </div>
            <div className="pd-qtr">
              <button value="wednesday" onClick={handleDayClick} className="day-btns">
                <div>Wednesday</div>
                <div>{parseInt(justDayDate) + 3}</div>
              </button>
            </div>
            <div className="pd-qtr">
              <button value="thursday" onClick={handleDayClick} className="day-btns">
                <div>Thursday</div>
                <div>{parseInt(justDayDate) + 4}</div>
              </button>
            </div>
            <div className="pd-qtr">
              <button value="friday" onClick={handleDayClick} className="day-btns">
                <div>Friday</div>
                <div>{parseInt(justDayDate) + 5}</div></button>
            </div>
            <div className="pd-qtr">
              <button value="saturday" onClick={handleDayClick} className="day-btns">
                <div>Saturday</div>
                <div>{parseInt(justDayDate) + 6}</div>
              </button>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-full centered">
            <h1>{renderTitle}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-full">
            <div className="btn-container">
              <button onClick={handleClick} className="add-btn"> + Add an Entry</button>
            </div>
          </div>
        </div>
        <div className="container col-full justify-content-ctr">
          <table>
            <thead>
              <tr>
                <th className="th-time">Time</th>
                <th className="th-location">Location</th>
                <th className="th-description">Description</th>
                <th className="th-button"></th>
              </tr>
            </thead>
            {renderDays()}
          </table>
        </div>
      </div>
    </>
  );
}

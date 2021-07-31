import React, { useState, useEffect } from 'react';
import AddEntry from './add-entry';
import EditEntry from './edit-entry';
import DeleteModal from './delete-modal';
import { startOfWeek, endOfWeek, format, eachDayOfInterval } from 'date-fns';

export default function Home(props) {
  const { start, end, startData, justDayDate } = renderDates();
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isEditClicked, setisEditClicked] = useState(false);
  const [isDeleteClicked, setisDeleteClicked] = useState(false);
  const [whichDayisClicked, setWhichDayisClicked] = useState('sunday');
  const [whichDayNumberisClicked, setwhichDayNumberisClicked] = useState(0);
  const [data, setData] = useState(null);
  const [editEntry, seteditEntry] = useState(null);
  const [newData, setNewData] = useState(true);
  const [week] = useState(startData);
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
    fetch(`/api/weeklyPlanner/${week}/${whichDayisClicked}`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setNewData(false);
      });
  };
  function renderDates() {
    const curr = new Date();
    const start = format(startOfWeek(curr), 'MM/dd/yyyy');
    const startData = format(startOfWeek(curr), 'MM-dd-yyyy');
    const end = format(endOfWeek(curr), 'MM/dd/yyyy');
    const justDayDate = format(startOfWeek(curr), 'dd');
    const weekDates = {
      start,
      end,
      startData,
      justDayDate
    };

    return weekDates;
  }

  // const { start, end, justDayDate } = renderDates();

  const renderTitle =
    whichDayisClicked[0].toUpperCase() + whichDayisClicked.slice(1);
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
  const renderDayTitle = format(
    renderDayOfWeekDate(whichDayNumberisClicked),
    'MM/dd/yyyy'
  );
  const renderWeekTitle = start + ' - ' + end;

  const handleDayClick = event => {
    const button = event.target.closest('button');
    const buttonValue = button.value;
    setWhichDayisClicked(buttonValue);
    setwhichDayNumberisClicked(button.id);
  };
  function renderDays() {
    if (data) {
      const renderedDays = (
        <tbody>
          {data.map((entry, index) => {
            return (
              <tr key={index}>
                <td>{entry.time}</td>
                <td>{entry.location}</td>
                <td>{entry.description}</td>
                <td className="btn-table-row">
                  <div className="btn-table-container">
                    <button
                      className="btn-table-edit"
                      value={entry}
                      onClick={() => handleEditClick(entry)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-table-delete"
                      value={entry}
                      onClick={() => handleDelete(entry)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      );
      return renderedDays;
    } else {
      return null;
    }
  }
  return (
    <>
      <div className="page-container">
        {isAddClicked && (
          <AddEntry
            onClick={handleClick}
            onSubmit={handleNewData}
            value={whichDayisClicked}
            date={renderDayTitle}
            weekStart={startData}
          />
        )}
        {isEditClicked && (
          <EditEntry
            value={editEntry}
            onClick={handleEdit}
            onSubmit={handleNewData}
            date={renderDayTitle}
            weekStart={start}
            dateNumber={whichDayNumberisClicked}
          />
        )}
        {isDeleteClicked && (
          <DeleteModal value={editEntry} onClick={handleDelete} />
        )}
        <div className="row">
          <div className="col-full centered">
            <h2 className="page-title">Weekly Planner</h2>
            <div className="row justify-content-ctr">
              <button>{'<<'}</button>
              <h3>{renderWeekTitle}</h3>
              <button>{'>>'}</button>
            </div>
          </div>
        </div>
        <div className="day-btns-container">
          <div className="row space-evenly wrap">
            <div className="pd-qtr">
              <button
                value="sunday"
                id={0}
                onClick={handleDayClick}
                className="day-btns sun-btn"
              >
                <div>Sunday</div>
                <div>{parseInt(justDayDate)}</div>
              </button>
            </div>
            <div className="pd-qtr">
              <button
                value="monday"
                id="1"
                onClick={handleDayClick}
                className="day-btns mon-btn"
              >
                <div>Monday</div>
                <div>{parseInt(justDayDate) + 1}</div>
              </button>
            </div>
            <div className="pd-qtr">
              <button
                value="tuesday"
                id="2"
                onClick={handleDayClick}
                className="day-btns tues-btn"
              >
                <div>Tuesday</div>
                <div>{parseInt(justDayDate) + 2}</div>
              </button>
            </div>
            <div className="pd-qtr">
              <button
                value="wednesday"
                id="3"
                onClick={handleDayClick}
                className="day-btns wed-btn"
              >
                <div>Wednesday</div>
                <div>{parseInt(justDayDate) + 3}</div>
              </button>
            </div>
            <div className="pd-qtr">
              <button
                value="thursday"
                id="4"
                onClick={handleDayClick}
                className="day-btns thurs-btn"
              >
                <div>Thursday</div>
                <div>{parseInt(justDayDate) + 4}</div>
              </button>
            </div>
            <div className="pd-qtr">
              <button
                value="friday"
                id="5"
                onClick={handleDayClick}
                className="day-btns fri-btn"
              >
                <div>Friday</div>
                <div>{parseInt(justDayDate) + 5}</div>
              </button>
            </div>
            <div className="pd-qtr">
              <button
                value="saturday"
                id="6"
                onClick={handleDayClick}
                className="day-btns sat-btn"
              >
                <div>Saturday</div>
                <div>{parseInt(justDayDate) + 6}</div>
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-full centered">
            <h1>{renderTitle}</h1>
            <h2>{renderDayTitle}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-full">
            <div className="btn-container">
              <button onClick={handleClick} className="add-btn">
                {' '}
                + Add an Entry
              </button>
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

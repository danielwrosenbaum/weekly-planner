import React, { useState } from 'react';
import Home from './home';

export default function AddEntry() {
  const [isAddClicked, setIsAddClicked] = useState(true);

  function handleCancel() {
    setIsAddClicked(false);
  }

  if (!isAddClicked) return <Home />;
  return (
    <div className="modal">

      <div className="modal-container">
        <div className="modal-box">
          <form>
            <div className="row">
              <div className="col-full">
                <h2>Add Entry</h2>
              </div>
            </div>
            <div className="row pd-one">
              <div className="col-full">
                <select
                  requiredname="day">
                  <option>--Day of the Week--</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
                <select
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
                <div className="row pd-one">
                  <div className="col-full">
                    <textarea
                      required
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

import React, { useState } from 'react';
import AddEntry from './add-entry';

export default function Home(props) {
  const [isAddClicked, setIsAddClicked] = useState(false);

  const handleClick = event => {
    if (!isAddClicked) {
      setIsAddClicked(true);
    } else {
      setIsAddClicked(false);
    }
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
        <div className="row justify-content-ctr">
          <div className="col-full ">
            <div className="btn-container justify-content-ctr">
              <button onClick={handleClick} className="add-btn">Add an Entry</button>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}

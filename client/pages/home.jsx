import React from 'react';

export default function Home(props) {

  function handleClick() {
    window.location.hash = 'add-entry';

  }
  return (
    <>
      <div className="page-container justify-content-ctr full-col align-items-ctr">
        <div className="button-container justify-content-ctr">
          <button onClick={() => handleClick()} className="add-btn">Add an Entry</button>
      </div>

    </div>
    </>
  );
}

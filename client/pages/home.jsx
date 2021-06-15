import React, { useState } from 'react';
import AddEntry from './add-entry';

export default function Home(props) {
  const [isAddClicked, setIsAddClicked] = useState(false);

  function handleClick() {
    setIsAddClicked(true);
  }
  if (isAddClicked) return <AddEntry />;

  return (
    <>
      <div className="page-container justify-content-ctr col-full align-items-ctr">
        <div className="button-container justify-content-ctr">
          <button onClick={() => handleClick()} className="add-btn">Add an Entry</button>
      </div>

    </div>
    </>
  );
}

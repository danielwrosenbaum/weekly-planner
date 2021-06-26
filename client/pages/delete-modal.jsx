import React from 'react';

export default function DeleteModal(props) {

  const handleNo = () => {
    props.onClick();
  };

  const handleDelete = event => {
    const entryId = props.value.entryId;
    const req = {
      method: 'DELETE'
    };
    fetch(`/api/weeklyPlanner/${entryId}`, req)
      .then(result => {
        props.onClick();
      });
  };
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-box">
          <div className="row">
            <div className="col-full">
              <h3>Are You Sure You Want to Delete This Entry?</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-full space-evenly">
              <button onClick={handleNo}>No</button>
              <button onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

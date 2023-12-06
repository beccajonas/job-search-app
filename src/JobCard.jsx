import { useState } from 'react';
import "./JobCard.css"
import { redirect } from 'react-router';

function JobCard({ jobs, onDelete }) {

  const [addFavorite, setAddFavorite] = useState(jobs.favorite);
  const [jobTitle, setJobTitle] = useState(jobs.jobTitle);
  const [company, setCompany] = useState(jobs.company);
  const [workLocation, setWorkLocation] = useState(jobs.workLocation);
  const [currentStatus, setCurrentStatus] = useState(jobs.status);
  const [notes, setNotes] = useState(jobs.notes);
  const [editMode, setEditmode] = useState(false);
  const [fullNotes, setFullNotes] = useState(false);

  const handleUpdate = (fieldsToUpdate) => {
    fetch(`http://localhost:3000/jobs/${jobs.id}`, {
      method: "PATCH",
      headers: { "content-type": "Application/json" },
      body: JSON.stringify(fieldsToUpdate)
    })
      .then(r => r.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error updating job:", error));
  };

  function handleJobTitle(e) {
    setJobTitle(e.target.value)
    handleUpdate({jobTitle: e.target.value})
  };

  function handleCompanyChange(e) {
   setCompany(e.target.value)
   handleUpdate({company: e.target.value})
  };

  function handleWorklocation(e) {
    setWorkLocation(e.target.value)
    handleUpdate({workLocation: e.target.value})
  };

  function handleStatusSelect(selected) {
    setCurrentStatus(selected);
    handleUpdate({ status: selected });
  };

  function handleFavoritedClick() {
    setAddFavorite(!addFavorite);
    handleUpdate({ favorite: !addFavorite });
  };

  function handleNotesChange(e) {
    setNotes(e.target.value);
    handleUpdate({ notes: e.target.value });
  };

function handleEditMode() {
  setEditmode(!editMode)
};

function toggleFullNotes() {
  setFullNotes(!fullNotes)
}

function handleSubmit(e) {
  e.preventDefault();
  const updatedCard = {
    status: currentStatus,
    notes: notes,
  }
  console.log(updatedCard)
};

function handleDelete() {
  fetch(`http://localhost:3000/jobs/${jobs.id}`, {
    method: "DELETE",
  }).then(r => r.json())
    .then(data => {
      onDelete(jobs.id)
      console.log(data)
    })
};

  return (
    <div className="display-cards" >
      <div>
        <div className="cardContainer">
          <div>
            <form onSubmit={handleSubmit}>
              <h2>{editMode ? 
                  <textarea rows={1} value={jobTitle} onChange={handleJobTitle} />: jobTitle}</h2>
              <p><strong>Company:</strong> {editMode ?
                  <textarea rows={1} value={company} onChange={handleCompanyChange} /> : company}</p>
              <p><strong>Work Location:</strong> {editMode ?
                <select value={workLocation} onChange={handleWorklocation}>
                    <option value="In Person 🏢">In Person 🏢</option>
                    <option value="Hybrid 🖥">Hybrid 🖥</option>
                    <option value="Remote 🏠">Remote 🏠</option>
                  </select> : workLocation}
              </p>
              <p><strong>Date Applied:</strong> {jobs.dateApplied}</p>
              <p><strong>Status:</strong> {editMode ?
                <select value={currentStatus} onChange={(e) => handleStatusSelect(e.target.value)}>
                  <option value="Applied 💼">Applied 💼</option>
                  <option value="Interview scheduled 🗓">Interview scheduled 🗓</option>
                  <option value="Interview complete ✅">Interview complete ✅</option>
                  <option value="Rejected ❌">Rejected ❌</option>
                </select> : currentStatus}
              </p>
              <div>
                <strong>Notes:</strong> {editMode ?
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={handleNotesChange}
                  /> : notes}
              </div>
              <p><a href={jobs.jobDescription}>Link to job description</a></p>
              <br className='favorite-div'/>
                <button className='button-class' onClick={handleFavoritedClick}>{addFavorite ? "⭐" : "☆"}</button>
                <br />
              <div className='button-div'>
                <button  className='button-class' onClick={handleEditMode} id="edit-button">{editMode ? "Save": "Edit"}</button>
                {editMode ? <button  className='button-delete' onClick={handleDelete} >Delete 🗑️</button>: null }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
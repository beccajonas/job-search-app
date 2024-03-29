import { useState } from 'react';
import "./JobTable.css";
import "./JobTableRow.css";

function JobTableRow({ job, handleDeleteCallback, onJobSave }) {
  const [editMode, setEditMode] = useState(false)
  const [newStatus, setNewStatus] = useState(job.status)
  const [newNotes, setNewNotes] = useState(job.notes)
  const [newFavorite, setNewFavorite] = useState(job.favorite)
  const [newLocation, setNewLocation] = useState(job.workLocation)
  const [newCompany, setNewCompany] = useState(job.company)
  const [newJobTitle, setNewJobTitle] = useState(job.jobTitle)
  const [newSalary, setNewSalary] = useState(job.salary)
  const [tdSelected, setTdSelected] = useState(false);
  const formattedDate = new Date(job.dateApplied).toLocaleDateString('en-US');


  function handleEditMode() {
    setEditMode(!editMode)
  } 

  function handleStatusChange(e) {
    setNewStatus(e.target.value);
  }

  function handleNoteChange(e) {
    setNewNotes(e.target.value)
  }

  function handleNoteDisplay() {
    setTdSelected(!tdSelected)
  }

  function handleNewFavorite() {
    setNewFavorite(!newFavorite)
  }

  function handleLocationChange(e) {
    setNewLocation(e.target.value)
  }

  function handleCompanyChange(e) {
    setNewCompany(e.target.value)
  }

  function handleJobTitleChange(e) {
    setNewJobTitle(e.target.value)
  }

  function handleSalaryChange(e) {
    setNewSalary(e.target.value)
  }

  function handleDelete() {
    handleDeleteCallback(job.id)
    fetch(`https://jobquest-e7ho.onrender.com/jobs/${job.id}`, {
      method: "DELETE"
  })
  }

  function handleSaveChanges() {
    setEditMode(false); 
    setNewStatus(newStatus);
    setNewNotes(newNotes);
    setNewFavorite(newFavorite);
    setNewLocation(newLocation)
    setNewCompany(newCompany)
    setNewJobTitle(newJobTitle)
    setNewSalary(newSalary)

    const updatedJob = {
      ...job,
      status: newStatus,
      notes: newNotes,
      favorite: newFavorite,
      workLocation: newLocation,
      company: newCompany,
      jobTitle: newJobTitle,
      salary: newSalary
    };
  
    fetch(`https://jobquest-e7ho.onrender.com/jobs/${job.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedJob)
    })
      .then(response => response.json())
      .then(data => {
        setNewStatus(data.status);
        setNewNotes(data.notes);
        setNewFavorite(data.favorite);
        setNewLocation(data.workLocation)
        setNewCompany(data.company)
        setNewJobTitle(data.jobTitle)
        setNewSalary(data.salary)
        onJobSave(prev => !prev)
      })
  }

  return (
    <tr>
      <td>
      {editMode ? (
      <div>
      <textarea
        rows={1}
        value={newJobTitle}
        onChange={handleJobTitleChange}
      />
      <p className='delete-button' onClick={handleDelete}>Delete 🗑</p>
      </div>
      ) : (
      <span className="job-title-link">
      <a href={job.jobDescription} target="_blank" rel="noopener noreferrer">
        {newJobTitle}
      </a>
      </span>
      )}  
      </td>
      <td>{editMode ? (
          <textarea 
          rows={1}
          value={newCompany}
          onChange={handleCompanyChange}
          ></textarea>
          ) : (
          newCompany
          )}
      </td>
      <td>{editMode ? (
          <textarea 
          rows={1}
          value={newSalary}
          onChange={handleSalaryChange}
          ></textarea>
          ) : (
          newSalary
          )}
      </td>
      <td>
        {editMode ? (
          <select onChange={handleLocationChange} value={newLocation}>
              <option>In Person 🏢</option>
              <option>Hybrid 🖥</option>
              <option>Remote 🏠</option>
          </select>
        ) : (
          newLocation
          )}
      </td>
      <td>
        {editMode ? (
          <select onChange={handleStatusChange} value={newStatus}>
            <option>Applied 💼</option>
            <option>Interview scheduled 🗓</option>
            <option>Interview complete ✅</option>
            <option>Rejected ❌</option>
          </select>
        ) : (
          newStatus
          )}
      </td>
      <td>{formattedDate}</td>
      <td onClick={handleNoteDisplay} className={`${tdSelected ? 'td-selected' : ''} notes-hover`}>
        {editMode ? (
          <textarea
            rows={1}
            value={newNotes}
            onChange={handleNoteChange}
          ></textarea>
        ) : (
          <div>
            {newNotes}
          </div>
        )}
      </td>
      <td>
          {editMode ? (
          <button className='job-table-button'  onClick={handleNewFavorite}>{newFavorite ? "⭐" : "☆"}</button>
          ) : (
          newFavorite ? "⭐" : "☆"
          )}
      </td>
      <td>{editMode ? (
          <button className='job-table-button' onClick={handleSaveChanges}>Save</button>
        ) : (
          <button className='job-table-button'  onClick={handleEditMode}>Edit</button>
        )}
      </td>
    </tr>
  );
}

export default JobTableRow;

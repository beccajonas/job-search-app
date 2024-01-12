import React, { useState, useEffect } from 'react';
import './NewJobForm.css';

function NewJobForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workLocation, setWorkLocation] = useState("Choose location");
  const [jobDescription, setJobDescription] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] = useState("Choose status");
  const [notes, setNotes] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [salary, setSalary] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    let timeout;
    if (showSuccessAlert) {
      timeout = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [showSuccessAlert]);

  function handleTitle(e) {
    setJobTitle(e.target.value);
  }

  function handleCompany(e) {
    setCompany(e.target.value);
  }

  function handleWorkLocation(e) {
    setWorkLocation(e.target.value);
  }

  function handleJobDescription(e) {
    setJobDescription(e.target.value);
  }

  function handleDate(e) {
    setDateApplied(e.target.value);
  }

  function handleStatus(e) {
    setStatus(e.target.value);
  }

  function handleNotes(e) {
    setNotes(e.target.value);
  }

  function handleSalary(e) {
    setSalary(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newJob = {
      jobTitle,
      company,
      workLocation,
      jobDescription,
      dateApplied,
      status,
      notes,
      favorite,
      salary
    };
    fetch('https://jobquest-e7ho.onrender.com/jobs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowSuccessAlert(true);
        setJobTitle("");
        setCompany("");
        setWorkLocation("Choose location");
        setJobDescription("");
        setDateApplied("");
        setStatus("Choose status");
        setNotes("");
        setSalary("");
        setFavorite(false);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  }

  return (
    <>
    <div className='form-container'>
    <form onSubmit={handleSubmit} className='form'>
      <div className='form-row'>
        <label htmlFor="jobTitle">Job Title</label>
        <input
          id="jobTitle"
          type="text"
          placeholder="Enter job title"
          value={jobTitle}
          onChange={handleTitle}
          required
        />

        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          placeholder="Enter company"
          value={company}
          onChange={handleCompany}
          required
        />

        <label htmlFor="salary">Salary</label>
        <input
          id="salary"
          type="text"
          placeholder="Enter salary"
          value={salary}
          onChange={handleSalary}
          required
        />

        <label htmlFor="workLocation">Work Location</label>
        <select
          id="workLocation"
          value={workLocation}
          onChange={handleWorkLocation}
          required
        >
          <option disabled>Choose location</option>
          <option>In Person 🏢</option>
          <option>Hybrid 🖥</option>
          <option>Remote 🏠</option>
        </select>
      </div>

      <div className='form-row'>
        <label htmlFor="jobDescription">Job Description Link</label>
        <input
          id="jobDescription"
          type="text"
          placeholder="Link to job description"
          value={jobDescription}
          onChange={handleJobDescription}
          required
        />

        <label htmlFor="dateApplied">Date Applied</label>
        <input
          id="dateApplied"
          type="date"
          value={dateApplied}
          onChange={handleDate}
          required
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={handleStatus}
          required
        >
          <option disabled>Choose status</option>
          <option>Applied 💼</option>
          <option>Interview scheduled 🗓</option>
          <option>Interview complete ✅</option>
          <option>Rejected ❌</option>
        </select>
      </div>

      <div className='form-group'>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          rows={2}
          placeholder="Add any notes"
          value={notes}
          onChange={handleNotes}
        />
      </div>

      <button type="submit" className='btn-primary'>
        Submit
      </button>
    </form>
  </div>
    <>
    <div className='success-alert-container'>
      {showSuccessAlert && (
        <div className='success-alert'>
          <p>Your job has been added!</p>
        </div>
      )}
    </div>
    </>
  </>
  
  );
}

export default NewJobForm;

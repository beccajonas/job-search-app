import { useState } from 'react';
import { ListGroup, Card, Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import './JobCard.css';

function JobCard({ jobs }) {
    const [addFavorite, setAddFavorite] = useState(jobs.favorite)
    const [currentStatus, setCurrentStatus] = useState(jobs.status);
    const [notes, setNotes] = useState(jobs.notes)

    console.log(jobs)

    function handleStatusSelect(selected) {
        setCurrentStatus(selected)
        fetch(`http://localhost:3000/jobs/${jobs.id}`, {
            method: "PATCH",
            headers: { "content-type": "Application/json" },
            body: JSON.stringify({status: selected})
        }).then(r => r.json())
          .then(data => console.log(data))
    }
        
    function handleFavoritedClick() {
        setAddFavorite(!addFavorite)
        fetch(`http://localhost:3000/jobs/${jobs.id}`, {
            method: "PATCH",
            headers: { "content-type": "Application/json" },
            body: JSON.stringify({ favorite: !addFavorite })
        }).then(r => r.json())
          .then(data => console.log(data))
    }

    function handleNotesChange(e) {
        setNotes(e.target.value)
        fetch(`http://localhost:3000/jobs/${jobs.id}`, {
            method: "PATCH",
            headers: { "content-type": "Application/json" },
            body: JSON.stringify({ notes: e.target.value })
        }).then(r => r.json())
          .then(data => console.log(data))
    }

  return (
    <Card className='card-display' >
      <Card.Body >
        <Card.Title>{jobs.jobTitle}</Card.Title>
        <ListGroup.Item><strong>Company:</strong> {jobs.company}</ListGroup.Item>
        <ListGroup.Item><strong>Work Location:</strong> {jobs.workLocation}</ListGroup.Item>
        <ListGroup.Item><strong>Date Applied:</strong> {jobs.dateApplied}</ListGroup.Item>
        <ListGroup.Item><strong>Status:</strong> {
            <DropdownButton id="dropdown-button" title={currentStatus} onSelect={handleStatusSelect}>
                <Dropdown.Item eventKey="Applied 💼">Applied 💼</Dropdown.Item>
                <Dropdown.Item eventKey="Interview scheduled 🗓">Interview scheduled 🗓</Dropdown.Item>
                <Dropdown.Item eventKey="Interview complete ✅">Interview complete ✅</Dropdown.Item>
                <Dropdown.Item eventKey="Rejected ❌">Rejected ❌</Dropdown.Item>
            </DropdownButton>}  
        </ListGroup.Item>
            <Card.Text>
                <strong>Notes:</strong> 
            </Card.Text>
            <Form.Control
                as="textarea"
                rows={2} 
                value={notes}
                onChange={handleNotesChange}
            />
        <Card.Link href={jobs.jobDescription}>Link to job description</Card.Link>
        <br/>
        <Button variant="primary" onClick={handleFavoritedClick}>{addFavorite ? "Remove from favorite" : "Add to favorite"}</Button>
      </Card.Body>
    </Card>
  );
}

export default JobCard;
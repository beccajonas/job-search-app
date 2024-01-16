import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

/**********************
Initial Fetches
************************/
useEffect(() => {
  fetch(`api/check_session`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      setUser(data);
      console.log('User state:', data);
    })
    .catch((error) => console.error('Error in useEffect:', error));
}, [setUser]);


/**********************
Authentication
************************/

function attemptLogin(userInfo) {
  console.log(`before fetch ${userInfo}`);
  fetch(`api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo)
  })
  .then(res => res.json())
  .then(data => {
    console.log(`.then data: ${data}`);
    setUser(data)
  })
}

function logout() {
  fetch(`/logout`, {
    method: 'DELETE'
  })
  .then(() => setUser(null))
  .catch(error => console.error(error)); // Handle errors
}

/**********************
Event handling
************************/

const handleChangeUsername = e => setUsername(e.target.value)
const handleChangePassword = e => setPassword(e.target.value)

function handleSubmit(e) {
  e.preventDefault()
  console.log("Submitting with:", { "user_name": username, "password": password });
  attemptLogin({ "user_name": username, "password": password })
}

  return (
    <div className="home-container">
      <div className="section">
        <h1>Welcome to Job Quest</h1>
      </div>
      <div className="section">
        <h2>A place to track and manage your job applications efficiently.</h2>
      </div>
      <div className="section">
        <p>Start your journey toward landing your dream job today!</p>
      </div>

      {user ? (
        <div>
          <Link to="/jobs">Welcome {user && user.user_name}! Let's get started.</Link>
        </div>
      ) : (
        <form className='section' onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            type="text"
            name='user_name'
            onChange={handleChangeUsername}
            value={username}
            placeholder='Username'
          />

          <input
            type="text"
            name="password"
            onChange={handleChangePassword}
            value={password}
            placeholder='Password'
          />

          <input
            type="submit"
            value='Login'
          />

        </form>
      )}
    </div>
  );
}


export default Home;


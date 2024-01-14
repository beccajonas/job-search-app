// import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
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
      <form className='section'>
          <h2>Login</h2>

          <input type="text"
          // onChange={handleChangeUsername}
          // value={name}
          placeholder='Name'
          />

          <input type="text"
          // onChange={handleChangePassword}
          // value={password}
          placeholder='Password'
          />

          <input type="submit"
          value='Login'
          />

          </form>
          <></>
      </div>
  );
}

export default Home;


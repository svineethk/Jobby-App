import './index.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

const Home = props => {
  const {history} = props
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    history.replace('/login')
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-content-container">
        <h1 className="home-header">
          Find the Job That <br /> Fits Your Life
        </h1>
        <p className="home-paragraph">
          Millions of people are searching for jobs, salary <br /> information,
          company reviews. Find the job that fits your <br /> abilities and
          potential.
        </p>
        <Link to="/jobs" className="nav-link">
          <button type="button" className="job-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home

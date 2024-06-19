import './index.css'
import {withRouter, Link} from 'react-router-dom'
import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>

      <ul className="large-screen-container">
        <li>
          <Link to="/" className="link-path">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link-path">
            Jobs
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>

      <ul className="small-screen-container">
        <li>
          <Link to="/" className="link-path">
            <IoMdHome className="small-home-button" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link-path">
            <BsBriefcaseFill className="small-job-button" />
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logout-button-container"
            onClick={onClickLogout}
          >
            <IoIosLogOut
              aria-label="logout-button"
              className="small-logout-button"
            />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)

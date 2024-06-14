import './index.css'
import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <div>
        <Link to="/" className="link-path">
          Home
        </Link>
        <Link to="/jobs" className="link-path">
          Jobs
        </Link>
      </div>
      <button type="button" className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)

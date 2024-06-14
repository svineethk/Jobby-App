import './index.css'

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmitFailure: false,
    showSubmitError: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onShowSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onShowSubmitFailure = errorMsg => {
    console.log(errorMsg)
  }

  onFormSubmitted = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onShowSubmitSuccess(data.jwt_token)
    } else {
      this.onShowSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitFailure, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password} = this.state
    return (
      <div className="app-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onFormSubmitted}>
            <label htmlFor="textLabel" className="text-label">
              USERNAME
            </label>
            <input
              type="text"
              id="textLabel"
              className="input"
              value={username}
              placeholder="Username"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="textPassword" className="text-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="textPassword"
              className="input"
              value={password}
              placeholder="Password"
              onChange={this.onChangePassword}
            />
            {showSubmitFailure && <p>{showSubmitError}</p>}
            <button type="submit" className="logIn-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute

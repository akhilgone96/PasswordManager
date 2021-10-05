import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordHome extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    searchInput: '',
    isShowPasswordsOn: false,
    passwordsList: [],
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  deletePassword = passwordId => {
    const {passwordsList} = this.state

    this.setState({
      passwordsList: passwordsList.filter(pass => pass.id !== passwordId),
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onChangeShowPasswords = () => {
    this.setState(prevState => ({
      isShowPasswordsOn: !prevState.isShowPasswordsOn,
    }))
    const {isShowPasswordsOn} = this.state
    console.log(isShowPasswordsOn)
  }

  onSubmitPassword = event => {
    event.preventDefault()
    const {website, userName, password} = this.state

    const newPassword = {
      id: v4(),
      websiteName: website,
      username: userName,
      userPassword: password,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      userName: '',
      password: '',
    }))
  }

  render() {
    const {
      website,
      userName,
      password,
      passwordsList,
      searchInput,
      isShowPasswordsOn,
    } = this.state

    const searchResults = passwordsList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="password-home-container">
        <img
          className="password-home-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="add-password-container">
          <form
            className="password-input-container"
            onSubmit={this.onSubmitPassword}
          >
            <h1>Add New Password</h1>
            <div className="input-container">
              <div className="input-logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logo"
                />
              </div>

              <input
                type="text"
                className="input-field"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <div className="input-logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logo"
                />
              </div>

              <input
                type="text"
                className="input-field"
                placeholder="Enter Username"
                value={userName}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="input-container">
              <div className="input-logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logo"
                />
              </div>

              <input
                type="password"
                className="input-field"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            alt="password manager"
            className="password-manager-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
        </div>
        <div className="passwords-container">
          <div className="search-section">
            <h1>
              Your Passwords
              <p className="password-count">{passwordsList.length}</p>
            </h1>
            <div className="search-container">
              <div className="search-logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-logo"
                />
              </div>
              <input
                className="search-input"
                type="search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="horizontal-rule" />
          <div className="checkbox-field">
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.onChangeShowPasswords}
            />
            <label htmlFor="checkbox">Show Passwords</label>
          </div>
          <ul className="display-passwords-container">
            {searchResults.length === 0 || searchResults === [] ? (
              <div className="no-result-view">
                <img
                  className="no-results-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p>no passwords</p>
              </div>
            ) : (
              searchResults.map(eachPassword => (
                <PasswordItem
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  deletePassword={this.deletePassword}
                  isShowPassword={isShowPasswordsOn}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordHome

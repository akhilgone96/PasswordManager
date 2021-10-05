import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, isShowPassword} = props
  const {id, websiteName, username, userPassword} = passwordDetails

  const displayPass = isShowPassword ? (
    `${userPassword}`
  ) : (
    <div>
      <img
        className="stars-image"
        alt="stars"
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      />
      <p>No Passwords</p>
    </div>
  )

  const displayPassClassName = isShowPassword ? 'details' : 'stars-image'

  const onDeletePassword = () => {
    deletePassword(id)
  }
  return (
    <li className="password-container">
      <div className="initial-container">
        <p className="initial">{websiteName[0].toUpperCase()}</p>
      </div>
      <div className="detail-container">
        <p className="details">{websiteName}</p>
        <p className="details">{username}</p>
        <p className={displayPassClassName}>{displayPass}</p>
      </div>
      <div className="delete-button-container">
        <button testid="delete" type="button" onClick={onDeletePassword}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem

import './index.css'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileSection = props => {
  const renderProfileSuccess = () => {
    const {profileData} = props

    return (
      <div className="profile-container">
        <img src={profileData.profileImageUrl} alt="profile img" />
        <h1 className="profile-header">{profileData.name}</h1>
        <p className="profile-paragraph">{profileData.shortBio}</p>
      </div>
    )
  }

  const renderProfileFailure = () => {
    const {getProfileDetailsRetry} = props

    return (
      <div className="profile-container-failure">
        <button
          type="button"
          className="retry-button"
          onClick={getProfileDetailsRetry}
        >
          Retry
        </button>
      </div>
    )
  }

  const renderProfileProgress = () => (
    <div
      className="profile-container-progress loader-container "
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const {profileApiStatus} = props

  switch (profileApiStatus) {
    case apiStatusConstants.success:
      return renderProfileSuccess()
    case apiStatusConstants.failure:
      return renderProfileFailure()
    case apiStatusConstants.inProgress:
      return renderProfileProgress()
    default:
      return null
  }
}

export default ProfileSection

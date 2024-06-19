import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {IoMdSearch} from 'react-icons/io'
import JobsFiltersData from '../JobsFiltersData'
import JobsProfileSection from '../JobsProfileSection'
import ProfileSection from '../ProfileSection'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    profileData: '',
    profileApiStatus: apiStatusConstants.initial,
    activeEmployeementList: '',
    activeSalaryRange: '',
    searchInput: '',
    activeSearchValue: '',
  }

  componentDidMount() {
    this.viewProfile()
  }

  viewProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(profileApiUrl, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const updatedProfileData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedProfileData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState(apiStatusConstants.failure)
    }
  }

  activeEmployeementList = dataEmploymentId => {
    this.setState(prevState => ({
      activeEmployeementList: [
        ...prevState.activeEmployeementList,
        dataEmploymentId,
      ],
    }))
  }

  activesalaryRangesList = dataSalaryRange => {
    this.setState({activeSalaryRange: dataSalaryRange})
  }

  onChangeSearchInput = event => {
    this.setState({activeSearchValue: event.target.value})
  }

  onClickSearchInput = () => {
    const {activeSearchValue} = this.state
    this.setState({searchInput: activeSearchValue})
  }

  getProfileDetailsRetry = () => {
    this.setState(
      {profileApiStatus: apiStatusConstants.initial},
      this.viewProfile,
    )
  }

  render() {
    const {
      profileData,
      profileApiStatus,
      searchInput,
      activeEmployeementList,
      activeSalaryRange,
      activeSearchValue,
    } = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filter-container">
            <ProfileSection
              profileData={profileData}
              profileApiStatus={profileApiStatus}
              getProfileDetailsRetry={this.getProfileDetailsRetry}
            />
            <JobsFiltersData
              activeEmploymentTypeList={this.activeEmployeementList}
              activesalaryRangesList={this.activesalaryRangesList}
            />
          </div>
          <div className="display-jobs-list-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                value={activeSearchValue}
                onChange={this.onChangeSearchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-button"
                onClick={this.onClickSearchInput}
              >
                <IoMdSearch className="search-icon" aria-label="icon" />
              </button>
            </div>
            <JobsProfileSection
              searchInput={searchInput}
              activeEmployeementList={activeEmployeementList}
              activeSalaryRange={activeSalaryRange}
            />
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute

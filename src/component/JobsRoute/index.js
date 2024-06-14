import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {IoMdSearch} from 'react-icons/io'
import JobsFiltersData from '../JobsFiltersData'
import JobsProfileSection from '../JobsProfileSection'

class JobsRoute extends Component {
  state = {
    profileData: '',
    activeEmployeementList: '',
    activeSalaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.viewProfile()
  }

  viewProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(profileApiUrl, options)
    const fetchedData = await response.json()
    const updatedProfileData = {
      name: fetchedData.profile_details.name,
      profileImageUrl: fetchedData.profile_details.profile_image_url,
      shortBio: fetchedData.profile_details.short_bio,
    }

    this.setState({profileData: updatedProfileData})
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
    this.setState({searchInput: event.target.value})
  }

  onClickSearchInput = () => {
    const {searchInput} = this.state
  }

  render() {
    const {
      profileData,
      searchInput,
      activeEmployeementList,
      activeSalaryRange,
    } = this.state
    return (
      <div className="jobs-container">
        <div className="filter-container">
          <div className="profile-container">
            <img src={profileData.profileImageUrl} alt="profile img" />
            <h1 className="profile-header">{profileData.name}</h1>
            <p className="profile-paragraph">{profileData.shortBio}</p>
          </div>
          <JobsFiltersData
            activeEmploymentTypeList={this.activeEmployeementList}
            activesalaryRangesList={this.activesalaryRangesList}
          />
        </div>
        <div className="display-jobs-list-container">
          <div className="search-container">
            <input
              type="search"
              value={searchInput}
              className="search-input"
              onChange={this.onChangeSearchInput}
            />
            <button
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
    )
  }
}

export default JobsRoute

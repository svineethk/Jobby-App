import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import RenderJobsDetails from '../RenderJobsDetails'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobsProfileSection extends Component {
  state = {
    jobsListData: [],
    isLoading: false,
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  componentDidUpdate(prevProps) {
    const {searchInput, activeEmployeementList, activeSalaryRange} = this.props
    if (
      prevProps.searchInput !== searchInput ||
      prevProps.activeEmployeementList !== activeEmployeementList ||
      prevProps.activeSalaryRange !== activeSalaryRange
    ) {
      this.getJobDetails()
    }
  }

  getJobDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, activeEmployeementList, activeSalaryRange} = this.props
    const updatedActiveEmployeementList = Array.isArray(activeEmployeementList)
      ? activeEmployeementList.join(',')
      : ''
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${updatedActiveEmployeementList}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsApiUrl, options)
    const jobsDetailsData = await response.json()
    if (response.ok === true) {
      const UpdatedJobDetailsData = jobsDetailsData.jobs.map(eachJobData => ({
        companyLogoUrl: eachJobData.company_logo_url,
        employmentType: eachJobData.employment_type,
        id: eachJobData.id,
        jobDescription: eachJobData.job_description,
        location: eachJobData.location,
        packagePerAnnum: eachJobData.package_per_annum,
        rating: eachJobData.rating,
        title: eachJobData.title,
      }))

      this.setState({
        apiStatus: apiConstantStatus.success,
        jobsListData: UpdatedJobDetailsData,
        isLoading: false,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure, isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobsListData} = this.state

    if (jobsListData.length === 0) {
      return this.renderNothingFound()
    }

    return (
      <div className="job-render-container">
        {jobsListData.map(eachJobData => (
          <RenderJobsDetails eachJobData={eachJobData} key={eachJobData.id} />
        ))}
      </div>
    )
  }

  renderNothingFound = () => (
    <div className="noJobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="error-header">No Jobs Found</h1>
      <p className="error-paragraph">
        We could not find any jobs. Try <br /> other filters
      </p>
    </div>
  )

  onClickRetryButton = () => {
    this.setState({apiStatus: apiConstantStatus.initial}, this.getJobDetails)
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="error-header">Oops! Something Went Wrong</h1>
      <p className="error-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderSuccessView()

      case apiConstantStatus.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading ? this.renderLoadingView() : this.renderStatusView()}
      </div>
    )
  }
}

export default JobsProfileSection

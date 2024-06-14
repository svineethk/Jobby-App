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
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployeementList}&minimum_package=${activeSalaryRange}&search=${searchInput}`
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
    <div className="loading-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {jobsListData} = this.state

    return (
      <div className="job-render-container">
        {jobsListData.map(eachJobData => (
          <RenderJobsDetails eachJobData={eachJobData} key={eachJobData.id} />
        ))}
      </div>
    )
  }

  renderLoadingView = () => {
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
      <>{isLoading ? this.renderLoadingView() : this.renderSuccessView()}</>
    )
  }
}

export default JobsProfileSection

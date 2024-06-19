import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import RenderSpecificJobDetailsView from '../RenderSpecificJobDetailsView'

const specificApiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class RenderSpecificJobsDetails extends Component {
  state = {
    jobDetails: [],
    similarJobDetails: [],
    isLoading: false,
    specificApiStatus: specificApiConstantStatus.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({isLoading: true})

    const jobDetailsApi = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobDetailsApi, options)
    const specificJobData = await response.json()

    if (response.ok === true) {
      const updatedJobDetailsData = {
        title: specificJobData.job_details.title,
        companyLogoUrl: specificJobData.job_details.company_logo_url,
        companyWebsiteUrl: specificJobData.job_details.company_website_url,
        employmentType: specificJobData.job_details.employment_type,
        id: specificJobData.job_details.id,
        jobDescription: specificJobData.job_details.job_description,
        location: specificJobData.job_details.location,
        packagePerAnnum: specificJobData.job_details.package_per_annum,
        rating: specificJobData.job_details.rating,
        description: specificJobData.job_details.life_at_company.description,
        imageUrl: specificJobData.job_details.life_at_company.image_url,
        skills: specificJobData.job_details.skills.map(skill => ({
          imageUrl: skill.image_url,
          name: skill.name,
        })),
      }

      const updatedSpecificJobDetailsData = specificJobData.similar_jobs.map(
        eachSpecificJob => ({
          companyLogoUrl: eachSpecificJob.company_logo_url,
          employmentType: eachSpecificJob.employment_type,
          id: eachSpecificJob.id,
          jobDescription: eachSpecificJob.job_description,
          location: eachSpecificJob.location,
          rating: eachSpecificJob.rating,
          title: eachSpecificJob.title,
        }),
      )

      this.setState({
        specificApiStatus: specificApiConstantStatus.success,
        isLoading: false,
        jobDetails: updatedJobDetailsData,
        similarJobDetails: updatedSpecificJobDetailsData,
      })
    } else {
      this.setState({
        specificApiStatus: specificApiConstantStatus.failure,
        isLoading: false,
      })
    }
  }

  renderSpecificSuccessView = () => {
    const {jobDetails, similarJobDetails} = this.state

    return (
      <RenderSpecificJobDetailsView
        jobDetails={jobDetails}
        similarJobDetails={similarJobDetails}
      />
    )
  }

  onClickRetryButton = () => {
    this.setState(
      {specificApiStatus: specificApiConstantStatus.initial},
      this.getJobItemDetails,
    )
  }

  renderSpecificFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="error-header">Oops! Something Went Wrong</h1>
      <p className="error-paragraph">
        We cannot seem to find the page you are looking for.
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

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSpecificViews = () => {
    const {specificApiStatus} = this.state

    switch (specificApiStatus) {
      case specificApiConstantStatus.initial:
      case specificApiConstantStatus.inProgress:
        return this.renderLoadingView()

      case specificApiConstantStatus.success:
        return this.renderSpecificSuccessView()

      case specificApiConstantStatus.failure:
        return this.renderSpecificFailureView()

      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="specific-job-container">
        <Header />
        {isLoading ? this.renderLoadingView() : this.renderSpecificViews()}
      </div>
    )
  }
}

export default RenderSpecificJobsDetails

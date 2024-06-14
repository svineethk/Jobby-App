import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'

import Header from '../Header'
import RenderSpecificJobDetailsView from '../RenderSpecificJobDetailsView'

class RenderSpecificJobsDetails extends Component {
  state = {jobDetails: [], specificJobDetails: [], isLoading: false}

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
    }

    const skills = specificJobData.job_details.skills.map(eachSkills => ({
      imageUrl: eachSkills.image_url,
      name: eachSkills.name,
    }))

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

    const updatedData = {
      ...updatedJobDetailsData,
      skills,
    }

    this.setState({
      isLoading: false,
      jobDetails: updatedData,
      specificJobDetails: updatedSpecificJobDetailsData,
    })
  }

  render() {
    const {jobDetails, specificJobDetails} = this.state

    return (
      <div className="specific-job-container">
        <Header />
        <RenderSpecificJobDetailsView jobDetails={jobDetails} />
      </div>
    )
  }
}

export default RenderSpecificJobsDetails

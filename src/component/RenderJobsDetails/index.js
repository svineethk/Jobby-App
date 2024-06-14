import {MdStar} from 'react-icons/md'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const RenderJobsDetails = props => {
  const {eachJobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobData

  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <div className="jobs-section-container">
        <div className="jobs-title-container">
          <img src={companyLogoUrl} alt={id} className="jobs-company-logo" />
          <div>
            <h1 className="jobs-title">{title}</h1>
            <div className="jobs-rating-container">
              <MdStar className="rating-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="jobs-section-details-container">
          <div className="jobs-rating-container">
            <IoLocation className="location-icon" />
            <p>{location}</p>
            <BsBriefcaseFill className="suitcase-icon" />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
    </Link>
  )
}

export default RenderJobsDetails

import './index.css'

import {MdStar} from 'react-icons/md'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobCard = props => {
  const {eachSimilarJobs} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
  } = eachSimilarJobs

  return (
    <li className="similar-jobs-card">
      <div className="similar-top-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-jobs-company-logo"
        />
        <div className="similar-title-container">
          <h2>{title}</h2>
          <div className="jobs-rating-container">
            <MdStar className="rating-icon" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <p className="similar-jobs-description">Description</p>
      <p>{jobDescription}</p>
      <div className="jobs-rating-container">
        <IoLocation className="location-icon" />
        <p>{location}</p>
        <BsBriefcaseFill className="suitcase-icon" />
        <p>{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobCard

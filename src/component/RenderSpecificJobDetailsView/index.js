import './index.css'

import {MdStar} from 'react-icons/md'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import SkillsCard from '../SkillsCard'

const RenderSpecificJobDetailsView = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    skills,
  } = jobDetails

  return (
    <div className="specific-job-view-container">
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
      <div className="description-container">
        <h1>Description</h1>
        <a href={companyWebsiteUrl} target="blank" className="visit-link">
          Visit
          <FaExternalLinkAlt className="visit-icon" />
        </a>
      </div>
      <p>{jobDescription}</p>
      <h1>Skills</h1>
      {skills.map(eachSkill => (
        <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
      ))}
    </div>
  )
}

export default RenderSpecificJobDetailsView

import './index.css'

import {MdStar} from 'react-icons/md'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import SkillsCard from '../SkillsCard'
import SimilarJobCard from '../SimilarJobCard'

const RenderSpecificJobDetailsView = props => {
  const {jobDetails, similarJobDetails} = props

  const {
    title,
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    description,
    imageUrl,
    skills = [],
  } = jobDetails

  return (
    <div>
      <div className="specific-job-view-container">
        <div className="jobs-title-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="jobs-company-logo"
          />
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
        <ul className="skills-containers">
          {skills.map(eachSkillsCard => (
            <SkillsCard
              key={eachSkillsCard.name}
              eachSkillsCard={eachSkillsCard}
            />
          ))}
        </ul>
        <h1 className="about-header">Life at Company</h1>
        <div className="about-container">
          <p className="about-paragraph">{description}</p>
          <img src={imageUrl} alt="life at company" />
        </div>
      </div>
      <h1 className="similar-jobs-header">Similar Jobs</h1>
      <ul className="similar-jobs-container">
        {similarJobDetails.map(eachSimilarJobs => (
          <SimilarJobCard
            key={eachSimilarJobs.id}
            eachSimilarJobs={eachSimilarJobs}
          />
        ))}
      </ul>
    </div>
  )
}

export default RenderSpecificJobDetailsView

import './index.css'

const SkillsCard = props => {
  const {eachSkillsCard} = props
  const {name, imageUrl} = eachSkillsCard

  return (
    <li className="each-skills-container">
      <img src={imageUrl} alt={name} className="each-skills-image" />
      <p className="each-skills-paragraph">{name}</p>
    </li>
  )
}

export default SkillsCard

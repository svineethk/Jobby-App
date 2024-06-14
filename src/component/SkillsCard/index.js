import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  console.log(skillDetails)
  const {name, imageUrl} = skillDetails

  return (
    <div>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </div>
  )
}

export default SkillsCard

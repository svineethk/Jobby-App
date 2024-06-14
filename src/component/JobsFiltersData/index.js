import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobsFiltersData = props => {
  const {activeEmploymentTypeList, activesalaryRangesList} = props

  const onChangeEmploymentId = event => {
    if (event.target.checked) {
      const dataEmploymentId = event.target.value
      activeEmploymentTypeList(dataEmploymentId)
    }
  }

  const onChangeSalaryRange = event => {
    const dataSalaryRange = event.target.value
    activesalaryRangesList(dataSalaryRange)
  }

  return (
    <div className="filter-list-container">
      <hr className="line" />
      <h1>Type of Employment</h1>
      {employmentTypesList.map(eachTypesList => (
        <div className="types-list-container">
          <li key={eachTypesList.employmentTypeId}>
            <input
              type="checkbox"
              id={eachTypesList.employmentTypeId}
              name={eachTypesList.employmentTypeId}
              value={eachTypesList.employmentTypeId}
              className="inputt"
              onChange={onChangeEmploymentId}
            />
            <label htmlFor={eachTypesList.employmentTypeId}>
              {eachTypesList.label}
            </label>
          </li>
        </div>
      ))}
      <hr className="line" />
      <h1>Salary Range</h1>
      {salaryRangesList.map(eachSalaryRange => (
        <div>
          <li key={eachSalaryRange.salaryRangeId}>
            <input
              type="radio"
              id={eachSalaryRange.salaryRangeId}
              name="group"
              value={eachSalaryRange.salaryRangeId}
              className="inputt"
              onChange={onChangeSalaryRange}
            />
            <label htmlFor={eachSalaryRange.salaryRangeId}>
              {eachSalaryRange.label}
            </label>
          </li>
        </div>
      ))}
    </div>
  )
}

export default JobsFiltersData

import cx from 'classnames'
import staticCareer from 'config/static/career'
import { CommonButton, H2, H4, H5, Tags } from 'elements'
import { useSpoiler } from 'helpers/useSpoiler'
import { useRouter } from 'next/router'
import React, { forwardRef, useRef } from 'react'

const Vacancy = ({
  id,
  name,
  description,
  experience,
  salary,
  working_time,
  tasks,
  requirements,
  conditions,
  openVacancy,
}) => {
  const ref = useRef(null)
  const { height, isOpened, toggleMore } = useSpoiler(ref)
  const getList = (items, title) => (
    <>
      <H5 content={title} parentSelector="vacancy-responsibilities-title" />
      <ul className="vacancy-responsibilities">
        {JSON.parse(items).map((item) => (
          <li className="vacancy-responsibility p" key={item}>
            <span className="list-marker" />
            {item}
          </li>
        ))}
      </ul>
    </>
  )
  return (
    <div className="vacancy">
      <div
        className={cx('vacancy-title-wrapper', {
          'footer-link--active': isOpened,
        })}
        onClick={toggleMore}
      >
        <H4 parentSelector="vacancy-title" content={name} />
        <span className="footer-link__icon">
          <span />
          <span />
        </span>
      </div>
      <div
        className="vacancy-content"
        style={{ height: height ? height + 20 : 0 }}
      >
        <div className="vacancy-spoiler" ref={ref}>
          <div className="vacancy-wrapper">
            <div className="vacancy-grid">
              <div className="vacancy-description p">{description}</div>
            </div>
            <div className="vacancy-grid vacancy-submit">
              <div className="work-items">
                <div className="work-item h3">
                  <H5 content="Опыт работы" parentSelector="" />
                  {experience}
                </div>
                <div className="work-item h3">
                  <H5 content="до вычета ндфл" parentSelector="" />
                  {salary}
                </div>
                <div className="work-item h3">
                  <H5 content="рабочее время" parentSelector="" />
                  {working_time}
                </div>
              </div>
              <CommonButton
                content="Откликнуться на вакансию"
                onClick={() => openVacancy(id)}
                parentSelector="vacancy-button"
              />
            </div>
          </div>
          <div className="work-conditions vacancy-wrapper">
            <div className="vacancy-grid">
              {getList(tasks, 'Вам потребуется')}
              {getList(requirements, 'Требования')}
            </div>
            <div className="vacancy-grid">{getList(conditions, 'Условия')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CareerVacancies = forwardRef(
  ({ openVacancy, vacancies: cities, defaultCity }, ref) => {
    const { title } = staticCareer.vacancies
    const router = useRouter()
    const activeGroup = router.query.tags || defaultCity
    // useEffect(() => {
    //   if (
    //     !activeGroup ||
    //     !cities.map((item) => item.slug).includes(activeGroup)
    //   ) {
    //     router.push({
    //       query: {
    //         tags: cities[0].slug,
    //       },
    //     })
    //   }
    // }, [])

    return (
      <div className="career__vacancies" ref={ref}>
        <H2 content={title} parentSelector="career__vacancies-title" />
        <Tags
          tags={cities}
          oneActive
          parentSelector="career__vacancies-tags"
          defaultTag={defaultCity}
        />
        <div className="career__vacancies-list">
          {cities
            .filter((city) => city.slug === activeGroup)[0]
            ?.vacancies.map((item) => (
              <Vacancy key={item.id} {...item} openVacancy={openVacancy} />
            ))}
        </div>
      </div>
    )
  }
)

export default CareerVacancies

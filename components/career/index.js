import { useMutation } from '@apollo/client'
import {
  CareerHistory,
  CareerPartnership,
  CareerVacancies,
  FormBasic,
  Toast,
} from 'components'
import { default as staticCareer } from 'config/static/career'
import { CardPerson, CommonButton, H1, H2, Image } from 'elements'
import VACANCY_MUTATION from 'graphql/mutations/vacancy.graphql'
import SmoothScrolling from 'helpers/scrollTo'
import React, { useRef, useState } from 'react'

function Career({ cities, video: cVideo }) {
  const {
    video,
    chief: card,
    note,
    feedback,
    title,
    subtitle,
    defaultCity,
  } = staticCareer
  const formRef = useRef(null)
  const vacanciesRef = useRef(null)
  const [activeVacancy, setActiveVacancy] = useState()

  const [toast, setToast] = useState({
    show: false,
    text: 'Не удалось отправить, попробуйте позже',
  })
  const [submitFormInit, { loading }] = useMutation(VACANCY_MUTATION)
  const submitForm = async (e) => {
    if (!loading) {
      return await submitFormInit(e)
    }
    return 'loading'
  }
  const scrollToVacancies = () => {
    SmoothScrolling.scrollTo(vacanciesRef.current, 81)
  }

  const openVacancy = (id) => {
    setActiveVacancy(id)
    SmoothScrolling.scrollTo(formRef.current, 81)
  }
  return (
    <>
      <div className="main-wrapper career">
        <div className="container">
          <H1 content={title} parentSelector="career__h1" />
          <div className="career__subtitle">
            <p className="p career__description">{subtitle}</p>
            <CommonButton
              content="Смотреть открытые вакансии"
              onClick={scrollToVacancies}
              parentSelector="career-button"
            />
          </div>
          {/* <VideoBlock
            title={video.title}
            description={video.description}
            videoId={cVideo.career_video}
            posterSrc={{
              normal: cVideo.career_preview,
              retina: cVideo.career_preview,
            }}
            parentSelector="career__video-block"
          /> */}
          <div className="career__video-block" style={{ position: 'relative' }}>
            <Image alt="poster" src={cVideo.career_preview} />
          </div>
          <div className="career__note">
            <H2 content={note} parentSelector="career__note-title" />
            <CardPerson
              parentSelector="career__person"
              title={card.title}
              description={card.description}
              src={card.src}
            />
          </div>
          <CareerPartnership />
          <CareerHistory />
          <CareerVacancies
            openVacancy={openVacancy}
            ref={vacanciesRef}
            vacancies={cities}
            defaultCity={defaultCity}
          />
          <div className="grid career__feedback" ref={formRef}>
            <div className="grid__col grid__col--sm">
              <h2 className="h2">{feedback.title}</h2>
              <p className="p career__feedback-text">{feedback.text}</p>
            </div>
            <div className="grid__col grid__col--lg">
              <FormBasic
                buttonText={feedback.button}
                sendForm={submitForm}
                vacancyId={activeVacancy}
                setToast={setToast}
              />
            </div>
          </div>
        </div>
      </div>
      <Toast
        text={toast.text}
        isShown={toast.show}
        setIsShown={(show) => {
          setToast({ ...toast, show })
        }}
      />
    </>
  )
}

export default Career

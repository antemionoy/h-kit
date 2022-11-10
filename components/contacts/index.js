import { useMutation } from '@apollo/client'
import { FormBasic, Map, Toast } from 'components'
import { H1, Tags } from 'elements'
import QUESTION_MUTATION from 'graphql/mutations/question.graphql'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'

function Contacts({ title, text, data, map, listTitles, form, defaultCity }) {
  const router = useRouter()
  const activeGroup = router.query.tags || defaultCity
  const [sendFormInit, { loading }] = useMutation(QUESTION_MUTATION)
  const sendForm = async (e) => {
    if (!loading) {
      return await sendFormInit(e)
    }
    return 'loading'
  }
  const [toast, setToast] = useState({
    show: false,
    text: 'Не удалось отправить, попробуйте позже',
  })

  const activeGroupData = data?.filter((item) => activeGroup === item.slug)

  return (
    <>
      <div className="main-wrapper contacts container">
        <H1 content={title} parentSelector="main-wrapper__h1" />
        <p className="p contacts__text">{text}</p>
        <Tags tags={data} defaultTag={defaultCity} oneActive />
        <div className="grid contacts__info">
          <div className="grid__col grid__col--sm contacts__info-col">
            <dl className="info-item contact-list">
              {activeGroupData?.length > 0 && (
                <Fragment key={activeGroupData[0].id}>
                  <dt className="info-item__title contact-list__item h5">
                    {listTitles.address}
                  </dt>
                  <dd className="info-item__info h4">
                    {activeGroupData[0].address}
                  </dd>
                  <dt className="info-item__title contact-list__item h5">
                    {listTitles.phone}
                  </dt>
                  <dd className="info-item__info h4">
                    <a
                      href={`tel:${activeGroupData[0].phone.replace(
                        /[\s()-]/g,
                        ''
                      )}`}
                      className="info-item__info-phone"
                    >
                      {activeGroupData[0].phone}
                    </a>
                  </dd>
                  <dt className="info-item__title contact-list__item h5">
                    {listTitles.time}
                  </dt>
                  <dd className="info-item__info h4">
                    {activeGroupData[0].working_time}
                  </dd>
                </Fragment>
              )}
            </dl>
          </div>
          <div className="grid__col grid__col--lg">
            {activeGroupData[0]?.coordinates && (
              <Map
                width={map.width}
                height={map.height}
                center={activeGroupData[0]?.coordinates}
                markers={data}
                zoom={map.zoom}
                removeHowToGetThereButton={map.removeHowToGetThereButton}
              />
            )}
          </div>
        </div>
        <div className="grid contacts__form">
          <div className="grid__col grid__col--sm">
            <h2 className="h2">{form.title}</h2>
          </div>
          <div className="grid__col grid__col--lg">
            <FormBasic
              buttonText={form.buttonText}
              sendForm={sendForm}
              toast={toast}
              setToast={setToast}
            />
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

export default Contacts

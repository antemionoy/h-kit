import { useMutation } from '@apollo/client'
import { FormBasic, Toast } from 'components'
import { Accordion } from 'elements'
import FAQ_QUESTION_MUTATION from 'graphql/mutations/faq_question.graphql'
import { useState } from 'react'

function Faq({ title, text, form, list }) {
  const [sendFormInit, { loading }] = useMutation(FAQ_QUESTION_MUTATION)
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

  return (
    <>
      <div className="main-wrapper faq">
        <div className="container">
          <h1 className="h1 main-wrapper__h1 faq__h1">{title}</h1>
          <p className="p faq__text">{text}</p>
          <Accordion parentSelector="faq__accordion" list={list} />
          <div className="grid faq__form">
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

export default Faq

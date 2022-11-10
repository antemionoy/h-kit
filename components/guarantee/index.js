import { useMutation } from '@apollo/client'
import { FormBasic, Toast } from 'components'
import { CardCredit, H1, NumericList } from 'elements'
import WARRANTY_QUESTION_MUTATION from 'graphql/mutations/warranty_question.graphql'
import { useState } from 'react'

function Guarantee({ data }) {
  const [sendFormInit, { loading }] = useMutation(WARRANTY_QUESTION_MUTATION)
  const sendForm = async (e) => {
    if (!loading) {
      return await sendFormInit(e)
    }
    return 'loading'
  }
  const { title, text, card, list, form } = data
  const [toast, setToast] = useState({
    show: false,
    text: 'Не удалось отправить, попробуйте позже',
  })

  return (
    <>
      <div className="main-wrapper guarantee">
        <div className="container">
          <H1 content={title} parentSelector="main-wrapper__h1" />
          <div className="grid">
            <p className="grid__col grid__col--lg guarantee__description p">
              {text}
            </p>
            <div className="grid__col grid__col--sm">
              <CardCredit
                description={card.description}
                title={card.title}
                caption={card.caption}
                isDown={card.isDown}
                parentSelector=""
              />
            </div>
          </div>
          <div className="grid guarantee__list">
            <div className="grid__col grid__col--sm">
              <h2 className="h3">{list.title}</h2>
            </div>
            <div className="grid__col grid__col--lg">
              <NumericList list={list.points} />
            </div>
          </div>
          <div className="grid guarantee__form">
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

export default Guarantee

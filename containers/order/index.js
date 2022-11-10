import { useMutation } from '@apollo/client'
import cx from 'classnames'
import { FormBasic, Toast } from 'components'
import orderStatic from 'config/static/order'
import ORDER_MUTATION from 'graphql/mutations/order.graphql'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function Order({
  title,
  description,
  hasKitchen = true,
  kitchenId,
  materialId,
  sinkId,
  technicId,
  parentSelector,
  isGray,
  expandTitle,
  price,
  onSubmit = () => {},
}) {
  const { defaultTitle, confidentiality, kitchenSize, button } = orderStatic
  const [sendFormInit, { loading }] = useMutation(ORDER_MUTATION)
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
      <div className={`${isGray ? 'order--wide' : ''}`}>
        <div
          className={cx('order grid', {
            [`${parentSelector}`]: parentSelector,
          })}
        >
          <div className="grid__col grid__col--sm">
            <h2 className="h2 order__title">{title || defaultTitle}</h2>
            {description && (
              <div className="p  order__descr-wrapper">
                <div className="order__descr">{description}</div>
                {price && <div className="order__descr">{price}</div>}
              </div>
            )}
          </div>
          <div className="grid__col grid__col--lg">
            <FormBasic
              buttonText={button}
              hasKitchen={hasKitchen}
              sendForm={sendForm}
              toast={toast}
              setToast={setToast}
              kitchenId={kitchenId}
              isGray={isGray}
              materialId={materialId}
              sinkId={sinkId}
              expandTitle={expandTitle}
              technicId={technicId}
              onSubmit={onSubmit}
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

export default Order

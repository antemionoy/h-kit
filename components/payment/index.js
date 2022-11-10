import { H1 } from 'elements'
import PaymentForm from 'containers/payment-form'

function Payment(props) {
  const { data } = props
  const { title, text } = data
  return (
    <div className="main-wrapper container">
      <H1 content={title} parentSelector="main-wrapper__h1" />
      <div className="grid">
        <div className="grid__col grid__col--sm">
          <p className="p">{text}</p>
        </div>
        <div className="grid__col grid__col--lg">
          <PaymentForm />
        </div>
      </div>
    </div>
  )
}

export default Payment

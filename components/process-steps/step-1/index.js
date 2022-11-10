import { H2, H4, P } from 'elements'

function Step1({ data }) {
  const { title, description, caption } = data
  return (
    <div className="step-1">
      <H4 parentSelector="step-1__caption" content={caption} />
      <div className="step-1__content">
        <H2 parentSelector="step-1__title" content={title} />
        <P parentSelector="step-1__description" content={description} />
      </div>
    </div>
  )
}
export default Step1

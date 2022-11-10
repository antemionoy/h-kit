import { H2, H4, Image, P } from 'elements'

function Step10({ data }) {
  const { title, description, caption, src } = data
  return (
    <div className="step-10">
      <H4 parentSelector="step-10__caption" content={caption} />
      <div className="step-10__content">
        <H2 parentSelector="step-10__title" content={title} />
        <P parentSelector="step-10__description" content={description} />
      </div>
      <Image  className="step-10__image" src={src} />
    </div>
  )
}
export default Step10

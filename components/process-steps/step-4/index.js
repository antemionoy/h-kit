import { CardDouble, H2, H4 } from 'elements'

function Step4({ data }) {
  const { caption, title, src, cardSrc, description, buttonText, href } = data
  return (
    <div className="step-4">
      <H4 parentSelector="step-4__caption" content={caption} />
      <H2 parentSelector="step-4__title" content={title} />
      <CardDouble
        parentSelector="step-4__card"
        src={src}
        cardSrc={cardSrc}
        description={description}
        // buttonText={buttonText}
        // href={href}
      />
    </div>
  )
}

export default Step4

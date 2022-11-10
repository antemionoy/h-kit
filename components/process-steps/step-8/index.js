import { CardDouble, H2, H4 } from 'elements'

function Step8({ data }) {
  const { caption, title, src, cardSrc, description, buttonText, href } = data
  return (
    <div className="step-8">
      <H4 parentSelector="step-8__caption" content={caption} />
      <H2 parentSelector="step-8__title" content={title} />
      <CardDouble
        parentSelector="step-8__card"
        src={src}
        cardSrc={cardSrc}
        description={description}
        buttonText={buttonText}
        href={href}
      />
    </div>
  )
}

export default Step8

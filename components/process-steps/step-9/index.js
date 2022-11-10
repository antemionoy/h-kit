import { CardFeedback } from 'elements'

function Step9({ data }) {
  const { caption, title, description, src, buttonText, href } = data

  return (
    <div className="step-9">
      <CardFeedback
        parentSelector="step-9__card"
        caption={caption}
        title={title}
        description={description}
        src={src}
        buttonText={buttonText}
        href={href}
        isReverse
      />
    </div>
  )
}

export default Step9

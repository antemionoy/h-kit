import { CardFeedback } from 'elements'

function Step2({ data, onClick }) {
  const { caption, title, description, src, buttonText } = data
  return (
    <div className="step-2">
      <CardFeedback
        parentSelector="step-2__card"
        caption={caption}
        title={title}
        description={description}
        src={src}
        buttonText={buttonText}
        onPairClick={onClick}
        href={null}
      />
    </div>
  )
}

export default Step2

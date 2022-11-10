import { H1, Image, P } from 'elements'

function ProccessMain({ data }) {
  const { title, description, src } = data
  return (
    <div className="process-main">
      <H1 content={title} parentSelector="process-main__title" />
      <P content={description} parentSelector="process-main__description" />
      <Image  src={src} className="process-main__image" />
    </div>
  )
}

export default ProccessMain

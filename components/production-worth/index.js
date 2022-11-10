import { H2, H6, Image, P } from 'elements'

function ProductionWorth({ data }) {
  const { title, src, list = [] } = data
  return (
    <div className="production-worth">
      <H2 parentSelector="production-worth__title" content={title} />
      <div className="production-worth__content">
        <div className="production-worth__image">
          <Image  src={src} alt="Плюсы собственного производства" />
        </div>
        <div className="production-worth__list">
          {list.map((item, index) => (
            <div key={index} className="production-worth__list-item">
              <H6
                parentSelector="production-worth__list-title"
                content={item.title}
              />
              <P
                parentSelector="production-worth__list-description"
                content={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductionWorth

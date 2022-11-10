import { CardPerson, H1, H2, H3, H5, Image, P } from 'elements'

function ProductionMain({ data }) {
  const { title, description, list = [], video, note, card, image } = data
  return (
    <div className="production-main">
      <H1 content={title} parentSelector="production-main__title" />
      <div className="production-main__content">
        <P
          content={description}
          parentSelector="production-main__description"
        />
        <div className="production-main__list">
          {list.map((item, index) => (
            <div className="production-main__list-item" key={index}>
              <H3
                parentSelector="production-main__list-title"
                content={item.title}
              />
              <H5
                parentSelector="production-main__list-caption"
                content={item.description}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="production-main__image">
        <Image src={image.normal} alt={image.alt} />
      </div>
      {/* <div className="production-main__preview">
      <div className="production-main__video">
      <VideoBlock
          title={video.title}
          description={video.description}
          videoId={video.videoId}
          posterSrc={video.posterSrc}
          parentSelector="production-main__video-block"
        />     
      </div>
        </div> */}
      <div className="production-main__note">
        <H2 content={note} parentSelector="production-main__note-title" />
        <CardPerson
          parentSelector="production-main__person"
          title={card.title}
          description={card.description}
          src={card.src}
        />
      </div>
    </div>
  )
}

export default ProductionMain

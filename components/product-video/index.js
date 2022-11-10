import { H4, Image, P, VideoBlock } from 'elements'

function ProductVideo({ data, isImage = false }) {
  const { video, list = [], img } = data
  return (
    <div className="history product-video">
      <div className="product-video__wrapper">
        {isImage ? (
          <Image 
            src={img.src}
            alt={img.alt}
            srcSet={img.src}
          />
        ) : (
          <VideoBlock
            title={video.title}
            description={video.description}
            videoId={video.videoId}
            posterSrc={video.posterSrc}
            parentSelector="product-video__video"
            isMini
          />
        )}
        <div className="product-video__list">
          {list.map((item, index) => (
            <div className="product-video__item" key={index}>
              <H4 parentSelector="product-video__title" content={item.title} />
              <P
                content={item.description}
                parentSelector="product-video__description"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductVideo

import { CardFeedback, H2, VideoBlock } from 'elements'

function Video({
  mainTitle,
  buttonText,
  title,
  slug,
  slugPath,
  description,
  video,
  image,
}) {
  return (
    <div className="main__feedback feedback">
      <H2 content={mainTitle} parentSelector="feedback__title" />
      <VideoBlock
        title={video.title}
        description={video.caption}
        videoId={video?.video?.link}
        posterSrc={video.image.path}
        parentSelector="feedback__video"
      />
      <CardFeedback
        title={title}
        description={description}
        src={image.path}
        buttonText={buttonText}
        href={slug}
        slugPath={slugPath}
        parentSelector="feedback__item"
      />
    </div>
  )
}

export default Video

import { H2, P, VideoBlock } from 'elements'

function CaseVideo({ title, description, video, image }) {
  return (
    <div className="case-video">
      <H2 content={title} parentSelector="case-video__title" />
      <P content={description} parentSelector="case-video__description" />
      <VideoBlock
        title={video.title}
        description={video.caption}
        videoId={video?.video?.link}
        posterSrc={image.path}
        parentSelector="case-video__video"
      />
    </div>
  )
}

export default CaseVideo

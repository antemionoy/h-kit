import { PATH } from 'config/path'
import { CardPerson, H2, P, PairButton, VideoBlock } from 'elements'
import { useSelector } from 'react-redux'

function HistoryCreate({
  title,
  summary,
  videoReview,
  slug,
  client,
  quote,
  buttonText,
}) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  return (
    <div className="history product-video">
      <div className="history__wrapper">
        {isMobile && <H2 content={title} parentSelector="history__title" />}
        {videoReview && (
          <VideoBlock
            title={videoReview.video.title}
            description={videoReview.video.caption}
            videoId={videoReview?.video?.video?.link}
            posterSrc={videoReview.video.image.path}
            parentSelector="history__video"
            isMini
          />
        )}
        <div className="history__card">
          {!isMobile && <H2 content={title} parentSelector="history__title" />}
          <P content={summary} parentSelector="history__description" />
          <PairButton
            parentSelector="history__btn"
            content={buttonText}
            href={`${PATH.CASES}/${slug}`}
          />
        </div>
      </div>
      {client && quote && (
        <div className="history__note">
          <H2 content={quote} parentSelector="history__note-title" />
          <CardPerson
            parentSelector="history__person"
            title={client.name}
            description={client.caption}
            src={client.image.path}
          />
        </div>
      )}
    </div>
  )
}

export default HistoryCreate

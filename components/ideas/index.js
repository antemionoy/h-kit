import cx from 'classnames'
import { CardAdvice, CardPreview, H2, H3, PairButton } from 'elements'
import { useSelector } from 'react-redux'
// import './ideas.scss'

function Ideas({
  title,
  buttonText,
  slug,
  parentSelector,
  ideasData,
  withBigCard,
  bigCardSlug = true,
}) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  return (
    <div
      className={cx('ideas', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {title && withBigCard ? (
        <H2 content={title} parentSelector="ideas__title" />
      ) : (
        <H3 content={title} parentSelector="ideas__title" />
      )}
      <div className="ideas__list">
        {ideasData &&
          ideasData
            .filter((v, i) => (isMobile ? i === 0 && withBigCard : true))
            .map((item, index) => {
              if (withBigCard && index === 0) {
                return (
                  <CardPreview
                    key={item.id}
                    title={item.title}
                    note={item.label}
                    description={item.description}
                    src={item.image.path}
                    parentSelector="ideas__item ideas__item--wide"
                    href={item.slug}
                    bigCardSlug={bigCardSlug}
                  />
                )
              }
              return (
                <CardAdvice
                  key={item.id}
                  title={item.title}
                  note={item.label}
                  description={item.description}
                  src={item.image.path}
                  href={`${slug ? `${slug}/` : ''}${item.slug}`}
                  parentSelector="ideas__item"
                />
              )
            })}
      </div>
      {isMobile && ideasData && (
        <div className="ideas__list ideas__list--overflow">
          {ideasData
            .filter((v, i) => (withBigCard ? i !== 0 : v))
            .map((item) => {
              return (
                <CardAdvice
                  key={item.id}
                  title={item.title}
                  note={item.label}
                  description={item.description}
                  src={item.image.path}
                  href={`${slug}/${item.slug}`}
                  parentSelector="ideas__item"
                />
              )
            })}
        </div>
      )}
      {buttonText && (
        <div className="ideas__pair">
          <PairButton content={buttonText} href={slug} />
        </div>
      )}
    </div>
  )
}

export default Ideas

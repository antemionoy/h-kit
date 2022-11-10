import cx from 'classnames'
import { H2, H4, Image, P } from 'elements'
import { useSelector } from 'react-redux'

function Preview({ data, parentSelector, className, ...props }) {
  const { title, description, src, vector, author, list = [], alt } = data

  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  return (
    <div
      className={cx('preview', {
        [`${className}`]: className,
        [`${parentSelector}`]: parentSelector,
      })}
      {...props}
    >
      {title && <H2 parentSelector="preview__title" content={title} />}
      {description && (
        <P parentSelector="preview__description" content={description} />
      )}
      <div className="preview__content">
        {!isMobile && (
          <div className="preview__image">
            {src && <Image  src={src} alt={title || alt} />}
          </div>
        )}
        <div className="preview__author">
          {author && <Image  src={author.src} alt={author.name} />}
        </div>
        {!isMobile && (
          <div className="preview__note">
            <H4 content={author.name} />
            <H4 content={author.post} parentSelector="preview__note-text" />
          </div>
        )}
        <div
          className="preview__vector"
          style={{
            backgroundImage: `url(${vector})`,
          }}
        />
      </div>
      {isMobile && (
        <div className="preview__note">
          <h3 className="h4">{author.name}</h3>
          <h3 className="h4 preview__note-text">{author.post}</h3>
        </div>
      )}
      {list.length > 0 && (
        <div className="preview__list">
          {list.map((item, index) => (
            <div className="preview__item" key={index}>
              {item.title && (
                <h3 className="preview__item-title h4">{item.title}</h3>
              )}
              <P content={item.description} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Preview

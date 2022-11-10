import cx from 'classnames'
import { CardCategory, H2, H4, Image, P } from 'elements'

function Categories({ data }) {
  const { parentSelector, caption, title, description, brands, list } = data
  return (
    <div
      className={cx('categories', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="categories__cards">
        {list.map((item, index) => (
          <CardCategory
            key={index}
            title={item.title}
            description={item.description}
            buttonText={item.buttonText}
            src={item.src}
            parentSelector="categories__card"
            href={item.slug}
          />
        ))}
      </div>
      <div className="categories__content">
        {caption && (
          <H4 content={caption} parentSelector="categories__caption" />
        )}
        <H2 content={title} parentSelector="categories__title" />
        <P content={description} parentSelector="categories__text" />
        <div className="categories__brands">
          {brands.map((item, index) => (
            <div className="categories__brand" key={index}>
              <Image  src={item.src} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories

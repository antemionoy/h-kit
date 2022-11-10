import cx from 'classnames'
import { PATH } from 'config/path'
import { CardVertical, Image, PairButton } from 'elements'

function CatalogCompilation(props) {
  const {
    parentSelector,
    caption,
    title,
    description,
    buttonText,
    href = '/',
    list = [],
    img,
    isReverse = false,
  } = props
  return (
    <div
      className={cx('catalog-compilation', {
        [`${parentSelector}`]: parentSelector,
        'catalog-compilation--reverse': isReverse,
      })}
    >
      <div className="catalog-compilation__content">
        <div className="catalog-compilation__content-wrapper">
          {/* <H5 parentSelector="catalog-compilation__caption" content={caption} />
          <H3 parentSelector="catalog-compilation__title" content={title} />
          <P
            parentSelector="catalog-compilation__description"
            content={description}
          /> */}
          <h5 className="h5 catalog-compilation__caption">{caption}</h5>
          <h5 className="h3 catalog-compilation__title">{title}</h5>
          <p className="p catalog-compilation__description"> {description}</p>
          <PairButton
            parentSelector="catalog-compilation__button"
            content={buttonText}
            href={href}
          />
        </div>
      </div>
      {list && (
        <div className="catalog-compilation__list">
          {list.map((item, index) => {
            return (
              <CardVertical
                key={item.id}
                title={item.title}
                price={item.price}
                priceDiscount={item.discount_price}
                src={item.preview.path}
                parentSelector="catalog-compilation__card"
                href={`${PATH.KITCHEN}/[slug]`}
                as={`${PATH.KITCHEN}/${item.slug}`}
                video={item.video}
                poster={item.poster}
                id={item.id}
                type="kitchens"
              />
            )
          })}
        </div>
      )}
      {img && (
        <Image 
          width={img.width}
          height={img.height}
          src={img.src}
          alt={img.alt}
        />
      )}
    </div>
  )
}

export default CatalogCompilation

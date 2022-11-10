import cx from 'classnames'
import { PATH } from 'config/path'
import { CardHorizontal, CardVertical, H2, PairButton } from 'elements'
import { useSelector } from 'react-redux'

function Proposal({
  list,
  title,
  buttonText,
  slug,
  parentSelector,
  withoutButton,
}) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)

  return (
    <div
      className={cx('proposal', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <H2 content={title} parentSelector="proposal__title" />
      <div className="proposal__list">
        {list
          .filter((i) => (isMobile ? i === 0 : true))
          .map((item, index) => {
            if (index === 0) {
              return (
                <CardHorizontal
                  key={item.id}
                  title={item.title}
                  price={item.price}
                  priceDiscount={item.discount_price}
                  src={item.preview.path}
                  parentSelector="proposal__item proposal__item--wide"
                  href={`${PATH.KITCHEN}/[slug]`}
                  as={`${PATH.KITCHEN}/${item.slug}`}
                  video={item.preview_video}
                  poster={item.preview.path}
                  id={item.id}
                  type="kitchens"
                />
              )
            }
            return (
              <CardVertical
                key={item.id}
                title={item.title}
                price={item.price}
                priceDiscount={item.discount_price}
                src={item.preview.path}
                parentSelector="proposal__item"
                href={`${PATH.KITCHEN}/[slug]`}
                as={`${PATH.KITCHEN}/${item.slug}`}
                video={item.preview_video}
                poster={item.preview.path}
                id={item.id}
                type="kitchens"
              />
            )
          })}
      </div>
      {isMobile && (
        <div className="proposal__list proposal__list--overflow">
          {list
            .filter((i) => i !== 0)
            .map((item) => (
              <CardVertical
                key={item.id}
                title={item.title}
                price={item.price}
                priceDiscount={item.discount_price}
                src={item.preview.path}
                parentSelector="proposal__item"
                href={`${PATH.KITCHEN}/[slug]`}
                as={`${PATH.KITCHEN}/${item.slug}`}
                video={item.preview_video}
                poster={item.preview.path}
                id={item.id}
                type="kitchens"
              />
            ))}
        </div>
      )}
      {!withoutButton && <PairButton content={buttonText} href={slug} />}
    </div>
  )
}

export default Proposal

import { PATH } from 'config/path'
import { CardVertical, H2, PairButton } from 'elements'

function AboutCatalog({ title, buttonText, list = [], href }) {
  return (
    <div className="about-catalog">
      <div className="about-catalog__content">
        <H2 parentSelector="about-catalog__title" content={title} />
        <PairButton
          parentSelector="about-catalog__button"
          content={buttonText}
          href={href}
        />
      </div>
      <div className="about-catalog__list">
        {list.map((item) => (
          <CardVertical
            key={item.kitchen.id}
            parentSelector="about-catalog__item"
            title={item.kitchen.title}
            price={item.kitchen.price}
            priceDiscount={item.kitchen.discount_price}
            src={item.kitchen.preview.path}
            href={`${PATH.KITCHEN}/[slug]`}
            as={`${PATH.KITCHEN}/${item.kitchen.slug}`}
            video={item.kitchen.video}
            poster={item.kitchen.poster}
            id={item.kitchen.id}
            type="kitchens"
          />
        ))}
      </div>
    </div>
  )
}
export default AboutCatalog

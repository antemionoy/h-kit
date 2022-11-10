import cx from 'classnames'
import { PATH } from 'config/path'
import { SUBMENU_DICTIONARY } from 'config/static/header'
import { CardVertical, H4, HeaderBar, P, RouterLink } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'

function HeaderCatalog(props) {
  const {
    parentSelector,
    title,
    slug,
    buttonText,
    list,
    cards,
    kitchenFilter,
    onMouseLeave = () => {},
  } = props
  return (
    <div
      className={cx('header-item-catalog', {
        [`${parentSelector}`]: parentSelector,
      })}
      onMouseLeave={onMouseLeave}
    >
      <HeaderBar
        buttonText={buttonText}
        title={title}
        slug={slug}
        onClick={onMouseLeave}
      />
      <div className="header-item-catalog__wrapper">
        {kitchenFilter && (
          <div className="header-item-catalog__list">
            {list.map((item) => {
              const currentFilter = SUBMENU_DICTIONARY[item.title]
              const leftRow = kitchenFilter[currentFilter].slice(
                0,
                Math.ceil(kitchenFilter[currentFilter].length / 2)
              )
              const rightRow = kitchenFilter[currentFilter].slice(
                Math.ceil(kitchenFilter[currentFilter].length / 2),
                kitchenFilter[currentFilter].length
              )

              return (
                <div className="header-item-catalog__item" key={item.title}>
                  <H4
                    content={item.title}
                    parentSelector="header-item-catalog__title"
                  />
                  <div className="header-item-catalog__rows">
                    <div className="header-item-catalog__row">
                      {leftRow &&
                        leftRow.map((link) => (
                          <RouterLink
                            href={`${PATH.KITCHENS}/${link.slug}`}
                            key={link.slug}
                            onClick={onMouseLeave}
                          >
                            <P
                              parentSelector="header-item-catalog__link"
                              content={link.name}
                            />
                          </RouterLink>
                        ))}
                    </div>
                    <div className="header-item-catalog__row">
                      {rightRow &&
                        rightRow.map((link) => (
                          <RouterLink
                            href={`${PATH.KITCHENS}/${link.slug}`}
                            key={link.slug}
                            onClick={onMouseLeave}
                          >
                            <P
                              parentSelector="header-item-catalog__link"
                              content={link.name}
                            />
                          </RouterLink>
                        ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {cards?.length > 0 &&
          cards.map((item) => (
            <CardVertical
              key={item.id}
              title={item.title}
              price={item.price}
              priceDiscount={item.discount_price}
              src={item.preview.path}
              href={`${PATH.KITCHEN}/[slug]`}
              as={`${PATH.KITCHEN}/${item.slug}`}
              poster={item.poster}
              video={item.video}
              parentSelector="header-item-catalog__card"
              onClick={onMouseLeave}
              id={item.id}
              type="kitchens"
            />
          ))}
      </div>
    </div>
  )
}

function equalFunc(prev, next) {
  return memoObj.byParentSelector(prev, next)
}
export default memo(HeaderCatalog)

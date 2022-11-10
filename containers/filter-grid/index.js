import { PATH } from 'config/path'
import { CardHorizontal, CardNewOffer, CardSpecial } from 'elements'
import { useFetchMoreScroll } from 'helpers/fetchMoreScroll'
import { Fragment } from 'react'

const LOAD_MORE = 'Загрузить еще'

function getCurrentItem(arr, index, number) {
  try {
    return arr[index / number - 1]
  } catch (e) {
    return false
  }
}

function FilterGrid({
  output = [],
  totalLenght = 0,
  blocks = [],
  type,
  num,
  isSpecials,
  fetchMore: fetchMoreInit,
}) {
  let number = 6
  if (num) {
    number = num
  }
  const { fetchMore } = useFetchMoreScroll(output, fetchMoreInit)

  return (
    <div className="filter-grid">
      <div className="filter-grid__layout">
        {output.map((item, index) => {
          const upIndex = index + 1
          const counter = upIndex % number === 0 && upIndex / number > 0
          let currentItem = null
          if (counter) {
            currentItem = getCurrentItem(blocks, upIndex, number)
          }
          return (
            <Fragment key={item.id || index}>
              {isSpecials ? (
                <CardSpecial
                  note={item.label}
                  title={item.title}
                  description={item.description}
                  src={item.image.path}
                  href={`${PATH.SPECIALS}/[slug]`}
                  as={`${PATH.SPECIALS}/${item.slug}`}
                  parentSelector="special-offer__card"
                />
              ) : (
                <CardHorizontal
                  title={item.title}
                  price={item.price}
                  priceDiscount={item.discount_price}
                  src={item.preview.path}
                  parentSelector="filter-grid__card"
                  href={`${PATH.KITCHEN}/[slug]`}
                  as={`${PATH.KITCHEN}/${item.slug}`}
                  video={item.video}
                  poster={item.poster}
                  id={item.id}
                  type={type}
                />
              )}
              {currentItem && isSpecials && blocks?.length > 0 && (
                <CardNewOffer
                  data={currentItem}
                  parentSelector="filter-grid__compilation container bg bg--gray"
                />
              )}
              {/* {currentItem && !isSpecials && (
                <CatalogCompilation
                  parentSelector="filter-grid__compilation container"
                  caption={currentItem.caption}
                  title={currentItem.name}
                  description={currentItem.summary}
                  buttonText={currentItem.button_text}
                  href={`${PATH.KITCHEN_COMPILATIONS}/${currentItem.slug}`}
                  list={currentItem.kitchens}
                  isReverse={(upIndex / number) % 2 === 0}
                />
              )} */}
            </Fragment>
          )
        })}
      </div>
      {output.length < totalLenght && (
        <div className={`more ${!isSpecials ? 'filter-grid__more' : ''}`}>
          <div className="more__wrapper">
            <span className="more__counter">
              {`Показано ${output.length} из ${totalLenght || output.length}`}
            </span>
            <div className="more__progress">
              <div
                className="more__progress-line"
                style={{ width: `${(output.length * 100) / totalLenght}%` }}
              />
            </div>
            <span
              className="more__load"
              onClick={fetchMoreInit}
              onKeyPress={fetchMoreInit}
              role="button"
              tabIndex={0}
            >
              {LOAD_MORE}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterGrid

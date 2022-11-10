import cx from 'classnames'
import { CardAdvice, CardProduct } from 'elements'
import { getCategoryPath, getNoun } from 'helpers'
import { useFetchMoreScroll } from 'helpers/fetchMoreScroll'
import { Fragment } from 'react'

const LOAD_MORE = 'Загрузить еще'

function ProductGrid({
  output = [],
  parentSelector,
  totalLenght = 0,
  offLoaded = 0,
  hideMore,
  fetchMore: fetchMoreInit,
  isAdvice,
  areBigCards,
  isMaterials,
  addOptions,
  slugPath,
  fadeOnFavorite,
  favRemoveItemFromState,
  favStateCategoryName,
  onlyMore = false,
  materialId,
}) {
  const { fetchMore } = useFetchMoreScroll(output, fetchMoreInit)
  const getMore = () =>
    !hideMore &&
    output.length + offLoaded < totalLenght && (
      <div className="product-grid__more more">
        <div className="more__wrapper">
          <span className="more__counter">
            {`Показано ${output.length + offLoaded} из ${
              totalLenght || output.length
            }`}
          </span>
          <div className="more__progress">
            <div
              className="more__progress-line"
              style={{
                width: `${((output.length + offLoaded) * 100) / totalLenght}%`,
              }}
            />
          </div>
          <span
            className="more__load"
            onClick={fetchMore}
            onKeyPress={fetchMore}
            role="button"
            tabIndex={0}
          >
            {LOAD_MORE}
          </span>
        </div>
      </div>
    )
  if (onlyMore) {
    return getMore()
  }
  if (!output || output.length === 0) {
    return null
  }

  return (
    <div
      className={cx('product-grid', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="product-grid__layout">
        {isMaterials &&
          output.map((item) => {
            let options = ''
            if (
              addOptions &&
              (item.count_color || item.material?.count_color)
            ) {
              options = getNoun(
                item.count_color || item.material?.count_color,
                'цвет',
                'цвета',
                'цветов'
              )
            }
            return (
              <CardProduct
                key={item.id}
                id={materialId ? item.material.id : item.id}
                type={item.type || item.material?.type}
                title={item.title || item.material?.title}
                description={item.summary || item.material?.summary}
                options={options}
                src={item.preview?.path || item.material?.preview?.path}
                hoverSrc={
                  item.preview_hover?.path || item.material?.preview_hover?.path
                }
                parentSelector={cx('product-grid__card', {
                  'card-product--big': areBigCards,
                })}
                href={`${getCategoryPath(
                  item.category?.slug || item.material?.category.slug,
                  item.type || item.material?.type
                )}/${item.slug || item.material?.slug}`}
                price={item.price || item.material?.price}
                priceDiscount={
                  item.priceDiscount || item.material?.priceDiscount
                }
                fadeOnFavorite={fadeOnFavorite}
                favRemoveItemFromState={favRemoveItemFromState}
                favStateCategoryName={favStateCategoryName}
              />
            )
          })}
        {!isMaterials &&
          output.map((item, index) => {
            return (
              <Fragment key={item.id || index}>
                {isAdvice ? (
                  <CardAdvice
                    title={item.title}
                    note={item.label}
                    description={item.description}
                    src={item.image?.path}
                    parentSelector="product-grid__card"
                    href={slugPath ? `${slugPath}/${item.slug}` : item.slug}
                  />
                ) : (
                  <CardProduct
                    id={item.id}
                    type={item.type}
                    title={item.title}
                    description={item.summary}
                    src={item.preview?.path}
                    hoverSrc={item.preview_hover?.path}
                    parentSelector={cx('product-grid__card', {
                      'card-product--big': areBigCards,
                    })}
                    href={`${getCategoryPath(item.category?.slug, item.type)}/${
                      item.slug
                    }`}
                    price={item.price}
                    priceDiscount={item.discount_price}
                    fadeOnFavorite={fadeOnFavorite}
                    favRemoveItemFromState={favRemoveItemFromState}
                    favStateCategoryName={favStateCategoryName}
                  />
                )}
              </Fragment>
            )
          })}
      </div>
      {getMore()}
    </div>
  )
}

export default ProductGrid

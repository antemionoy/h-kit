import { CatalogCompilation } from 'components'
import { PATH } from 'config/path'
import { Order } from 'containers'
import { CardHorizontal, FilterSort, Image, PairButton } from 'elements'
import { catalogHelpers } from 'helpers'
import mockCompilation from 'mock/compilation'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

const { getActiveSort } = catalogHelpers
const NOT_CHOSEN_ONE = 'Не выбрано'
const Compilation = ({ compilation: initCompilation }) => {
  const { backTo, sort, order } = mockCompilation
  const router = useRouter()
  const { query, pathname } = router
  const onSortChange = useCallback((query, slug) => {
    router.push({
      pathname,
      query: {
        ...query,
        sort: slug,
      },
    })
  }, [])
  const { related } = initCompilation
  return (
    <div className="compilation container">
      <div className="compilation__description-wrapper">
        <div className="compilation__description container">
          <PairButton content={backTo.title} href={PATH.KITCHENS} isBack />
          <h2 className="h2 compilation__description-title">
            {initCompilation.name}
          </h2>
          <div className="p compilation__description-text">
            {initCompilation.summary}
          </div>
        </div>
        <div
          className="compilation__description-vector"
          style={{
            backgroundImage: `url(/images/main-slider-bg.png)`,
          }}
        />
        <div className="compilation__description-image">
          {initCompilation.image && (
            <Image 
              src={initCompilation.image.path.normal}
              srcSet={`${initCompilation.image.path.normal} 1x, ${initCompilation.image.path.retina} 2x`}
              alt={initCompilation.name}
            />
          )}
        </div>
      </div>
      <FilterSort
        parentSelector="compilation__sort"
        list={sort}
        onClick={onSortChange}
        query={query}
        activeItem={getActiveSort(sort, query.sort) || NOT_CHOSEN_ONE}
      />
      <div className="filter-grid">
        <div className="filter-grid__layout compilation__cards">
          {initCompilation.kitchens.map((kitchen) => (
            <CardHorizontal
              key={kitchen.id}
              title={kitchen.title}
              price={kitchen.price}
              priceDiscount={kitchen.discount_price}
              src={kitchen.preview.path}
              parentSelector="filter-grid__card"
              href={`${PATH.KITCHEN}/[slug]`}
              as={`${PATH.KITCHEN}/${kitchen.slug}`}
              video={kitchen.preview_video}
              poster={kitchen.preview.path}
              id={kitchen.id}
              type="kitchen"
            />
          ))}
        </div>
      </div>
      <CatalogCompilation
        parentSelector="filter-grid__compilation container compilation__next"
        caption={related.caption}
        title={related.name}
        description={related.summary}
        buttonText={related.button_text}
        href={`${PATH.KITCHEN_COMPILATIONS}/${related.slug}`}
        list={related.kitchens}
        isReverse
      />
      <Order parentSelector="compilation__order" title={order.title} />
    </div>
  )
}

export default Compilation

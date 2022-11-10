import cx from 'classnames'
import { H1, P } from 'elements'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

function CatalogProducts({
  pageSlug = '/catalog/materials',
  title,
  list = [],
  defaultCategory,
}) {
  const router = useRouter()
  const activeGroup = router.query.group || defaultCategory
  // useEffect(() => {
  //   try {
  //     if (typeof window !== 'undefined' && !activeGroup) {
  //       router.push(
  //         {
  //           pathname: pageSlug,
  //           query: {
  //             group: list[0].slug,
  //           },
  //         },
  //         undefined,
  //         { shallow: true }
  //       )
  //     }
  //   } catch (e) {}
  // }, [])

  const onGroupClick = useCallback((slug) => {
    router.push(
      {
        pathname: `${pageSlug}/${slug}`,
      },
      undefined,
      { shallow: true }
    )
  }, [])

  return (
    <div className="catalog-products">
      <H1 parentSelector="catalog-products__title h2" content={title} />
      <div className="catalog-products__list">
        {list.map((item) => {
          const isActive = activeGroup === item.slug
          return (
            <h3
              key={item.id}
              className={cx(
                'catalog-products__subtitle h4 catalog-products__link',
                {
                  'catalog-products__subtitle--active': isActive,
                }
              )}
              onClick={onGroupClick.bind(this, item.slug)}
            >
              {item.name}
            </h3>
          )
        })}
      </div>
      <P
        content={
          activeGroup && list.find((i) => i.slug === activeGroup)?.description
        }
        parentSelector="catalog-products__description"
      />
    </div>
  )
}

export default CatalogProducts

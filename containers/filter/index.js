import cx from 'classnames'
import { FilterRange, FilterSelect, FilterSort, FilterTag } from 'elements'
import { catalogHelpers, getFilterPlaceholder } from 'helpers'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

const {
  generateNewGroup,
  checkTagActive,
  generateNewTags,
  getActiveSort,
  getSelectorArr,
  deleteCategoryFromQuery,
} = catalogHelpers

const RESET_ALL = 'Сбросить все'
const NOT_CHOSEN_ONE = 'Не выбрано'

function Filter({
  parentSelector,
  pageSlug,
  filters = [],
  order = [],
  tags = [],
  splitTags,
  withReset,
  activeParam,
}) {
  const router = useRouter()
  const query = deleteCategoryFromQuery(router.query, ['param', 'group', 'tag'])
  const isMobile = useSelector((state) => state.breakpoint.isMobile)

  const onSelectClick = useCallback((groupSlug, slug, query, alreadyHas) => {
    router.push(
      {
        pathname:
          slug === router.query.param
            ? pageSlug.replace(`/${slug}`, '')
            : pageSlug,
        query: {
          ...query,
          [groupSlug]: generateNewGroup(query, groupSlug, slug, alreadyHas),
        },
      },
      undefined,
      { shallow: true }
    )
  }, [])
  const onTagClick = useCallback(
    (d, slug, alreadyHas) => {
      router.push(
        {
          pathname:
            alreadyHas && router.query.tag === slug
              ? pageSlug.replace(`/${slug}`, '')
              : pageSlug,
          query: {
            ...query,
            tags: generateNewTags(query.tags, slug, alreadyHas),
          },
        },
        undefined,
        { shallow: true }
      )
    },
    [query]
  )
  const onSortChange = useCallback((query, slug) => {
    router.push(
      {
        pathname: pageSlug,
        query: {
          ...query,
          sort: slug,
        },
      },
      undefined,
      { shallow: true }
    )
  }, [])
  const onChangePrice = useCallback((query, min, max) => {
    router.push(
      {
        pathname: pageSlug,
        query: {
          ...query,
          min: min || query.min,
          max: max || query.max,
        },
      },
      undefined,
      { shallow: true }
    )
  }, [])
  const onResetCategory = useCallback(
    (s, slug) => {
      router.push(
        {
          pathname:
            slug === activeParam.key
              ? pageSlug.replace(`/${activeParam.slug}`, '')
              : pageSlug,
          query: deleteCategoryFromQuery(query, slug),
        },
        undefined,
        { shallow: true }
      )
    },
    [query]
  )

  const onResetAll = useCallback(() => {
    const routerObj = {
      pathname: router.query.param
        ? pageSlug.replace(`/${router.query.param}`, '')
        : pageSlug,
    }
    if (query && query.group) {
      routerObj.query = {
        group: query.group,
      }
    }
    router.push(routerObj, undefined, { shallow: true })
  }, [query])

  if (tags?.length < 1) return null

  return (
    <div
      className={cx('filter', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {isMobile && (
        <div className="filter__mobile">
          {order && order.length > 0 && (
            <FilterSort
              parentSelector="filter__sort"
              list={order}
              onClick={onSortChange}
              query={query}
              activeItem={getActiveSort(order, query.sort) || NOT_CHOSEN_ONE}
            />
          )}
          {withReset &&
            (tags?.length > 0 ||
              (filters && Object.keys(filters).length > 0)) && (
              <div className="filter__reset" type="button" onClick={onResetAll}>
                {RESET_ALL}
              </div>
            )}
        </div>
      )}

      {!isMobile &&
        withReset &&
        (tags?.length > 0 || (filters && Object.keys(filters).length > 0)) && (
          <button className="filter__reset" type="button" onClick={onResetAll}>
            {RESET_ALL}
          </button>
        )}
      {filters && Object.keys(filters).length > 0 && (
        <div className="filter__selectors">
          {Object.keys(filters).map((key, index) => {
            if (key.includes('__')) return null
            if (key.includes('price')) return null // HIDE PRICE FILTER
            if (key === 'price') {
              return (
                <FilterRange
                  key={key}
                  parentSelector="filter__selector"
                  isDefault={!query.min && !query.max}
                  min={query.min}
                  max={query.max}
                  defaultMin={filters.price.min}
                  defaultMax={filters.price.max}
                  placeholder={getFilterPlaceholder(key)}
                  query={query}
                  onReset={onResetCategory}
                  onChange={onChangePrice}
                />
              )
            }
            let activeArr = getSelectorArr(query, key)
            if (key === activeParam?.key) {
              activeArr.push(activeParam?.slug)
            }
            return (
              <FilterSelect
                key={key}
                index={index}
                parentSelector="filter__selector"
                list={filters[key]}
                onClick={onSelectClick}
                activeArr={activeArr}
                placeholder={getFilterPlaceholder(key)}
                countOptions={activeArr.length}
                type={key}
                slug={key}
                query={query}
                onReset={onResetCategory}
                activeParam={activeParam}
              />
            )
          })}
        </div>
      )}
      <div className="filter__tags-wrapper">
        <div className="filter__tags">
          {!isMobile &&
            tags.map((item) => {
              const isActive =
                checkTagActive(query.tags, item.slug) ||
                checkTagActive(router.query.tag, item.slug)
              return (
                <FilterTag
                  key={item.id}
                  title={item.name}
                  parentSelector="filter__tag"
                  isActive={isActive}
                  onClick={onTagClick.bind(this, query, item.slug, isActive)}
                />
              )
            })}
          {isMobile && !splitTags && (
            <div className="filter__tags-row tags-list">
              {tags.map((item) => {
                const isActive =
                  checkTagActive(query.tags, item.slug) ||
                  checkTagActive(router.query.tag, item.slug)
                return (
                  <FilterTag
                    key={item.id}
                    title={item.name}
                    parentSelector="filter__tag"
                    isActive={isActive}
                    onClick={onTagClick.bind(this, query, item.slug, isActive)}
                  />
                )
              })}
            </div>
          )}
          {isMobile && splitTags && (
            <>
              <div className="filter__tags-row tags-list">
                {tags.slice(0, tags.length / 2).map((item) => {
                  const isActive =
                    checkTagActive(query.tags, item.slug) ||
                    checkTagActive(router.query.tag, item.slug)
                  return (
                    <FilterTag
                      key={item.id}
                      title={item.name}
                      parentSelector="filter__tag"
                      isActive={isActive}
                      onClick={onTagClick.bind(
                        this,
                        query,
                        item.slug,
                        isActive
                      )}
                    />
                  )
                })}
              </div>
              <div className="filter__tags-row tags-list">
                {tags.slice(tags.length / 2, tags.length).map((item) => {
                  const isActive =
                    checkTagActive(query.tags, item.slug) ||
                    checkTagActive(router.query.tag, item.slug)
                  return (
                    <FilterTag
                      key={item.id}
                      title={item.name}
                      parentSelector="filter__tag"
                      isActive={isActive}
                      onClick={onTagClick.bind(
                        this,
                        query,
                        item.slug,
                        isActive
                      )}
                    />
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {!isMobile && order && order.length > 0 && (
        <FilterSort
          parentSelector="filter__sort"
          list={order}
          onClick={onSortChange}
          query={query}
          activeItem={getActiveSort(order, query.sort) || NOT_CHOSEN_ONE}
        />
      )}
    </div>
  )
}

export default Filter

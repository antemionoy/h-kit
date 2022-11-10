import cx from 'classnames'
import { CardDescription, FilterTag } from 'elements'
import { catalogHelpers } from 'helpers'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const { checkTagActive, generateNewTags } = catalogHelpers

function Tags({
  parentSelector,
  pageSlug,
  tags = [],
  oneActive,
  defaultTag,
  toggleOneActive = false,
}) {
  const router = useRouter()

  const onTagClick = useCallback((query, slug, alreadyHas) => {
    // Remove slug from query so it doesn't go to the URL
    const { slug: removedSlug, ...restQuery } = query
    if (oneActive) {
      let sendQuery = {
        ...restQuery,
        tags: slug,
      }

      if (toggleOneActive && query.tags === slug) {
        delete sendQuery.tags
      }
      router.push(
        {
          pathname: pageSlug,
          query: sendQuery,
        },
        undefined,
        { shallow: true }
      )
      return
    }
    router.push(
      {
        pathname: pageSlug,
        query: {
          ...restQuery,
          tags: generateNewTags(query.tags, slug, alreadyHas),
        },
      },
      undefined,
      { shallow: true }
    )
  }, [])

  return (
    <ul className={cx('tags-list', { [`${parentSelector}`]: parentSelector })}>
      {tags.map((item) => {
        const queryTags =
          router.query.tags?.length > 0 ? router.query.tags : defaultTag
        const isActive = checkTagActive(queryTags, item.slug)
        return (
          <li className="tags-list__item" key={item.slug}>
            {item.href ? (
              <CardDescription title={item.name} href={item.slug} />
            ) : (
              <FilterTag
                title={item.name || item.city}
                isActive={isActive}
                onClick={onTagClick.bind(
                  this,
                  router.query,
                  item.slug,
                  isActive
                )}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Tags

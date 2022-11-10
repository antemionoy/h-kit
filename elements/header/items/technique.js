import cx from 'classnames'
import { CardNav, HeaderBar , Image } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'
import { PATH } from 'config/path'
// import './technique.scss'

function HeaderTechnique(props) {
  const {
    parentSelector,
    list,
    buttonText,
    title,
    slug,
    onMouseLeave = () => {},
    technicsCategories,
  } = props
  return (
    <div
      className={cx('header-item-technique', {
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
      <div className="header-item-technique__wrapper">
        {technicsCategories.slice(0, 4).map((item, index) => {
          // TODO: more than 4 categories ??
          const maxFourTags = item.tags.filter((i, index) => index < 4)
          return (
            <CardNav
              key={item.id}
              title={item.name}
              list={maxFourTags}
              listSlug={`${PATH.TECHNICS}/${item.slug}/`}
              src={list[index % 4].image}
              slug={`${PATH.TECHNICS}/${item.slug}`}
              onClick={onMouseLeave}
              parentSelector="header-item-technique__card"
            />
          )
        })}
      </div>
    </div>
  )
}
function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(HeaderTechnique)

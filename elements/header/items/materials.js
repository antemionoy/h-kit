import cx from 'classnames'
import { CardNav, HeaderBar , Image } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'
import { PATH } from 'config/path'
// import './materials.scss'

function HeaderStocks(props) {
  const {
    parentSelector,
    list,
    buttonText,
    title,
    slug,
    materialCategories,
    onMouseLeave = () => {},
  } = props
  return (
    <div
      className={cx('header-item-materials', {
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
      <div className="header-item-materials__wrapper">
        {materialCategories.map((item, index) => {
          const maxThreeTags = item.tags.filter((i, index) => index < 3)

          return (
            <CardNav
              key={item.id}
              title={item.name}
              list={maxThreeTags}
              listSlug={`${PATH.MATERIALS}/?group=${item.slug}&tags=`}
              src={list[index].image}
              slug={`${PATH.MATERIALS}/?group=${item.slug}`}
              onClick={onMouseLeave}
              parentSelector="header-item-materials__card"
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
export default memo(HeaderStocks)

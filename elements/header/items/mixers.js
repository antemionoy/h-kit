import cx from 'classnames'
import { CardNav, CardPreview, HeaderBar, Image } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './mixers.scss'
import { PATH } from 'config/path'

function HeaderMixers(props) {
  const {
    parentSelector,
    list,
    buttonText,
    title,
    slug,
    advice,
    sinksCategories = [],
    onMouseLeave = () => {},
  } = props
  return (
    <div
      className={cx('header-item-mixers', {
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
      <div className="header-item-mixers__wrapper">
        {sinksCategories.map((item, index) => {
          const maxFourTags = item.tags.filter((i, index) => index < 4)

          return (
            <CardNav
              key={item.id}
              title={item.name}
              list={maxFourTags}
              listSlug={`${PATH.SINKS}/${item.slug}/`}
              src={list[index].image}
              slug={`${PATH.SINKS}/${item.slug}`}
              onClick={onMouseLeave}
              parentSelector="header-item-mixers__card"
            />
          )
        })}
        {advice && (
          <CardPreview
            title={advice.title}
            note={advice.label}
            description={advice.description}
            src={advice.image.path}
            parentSelector="header-item-mixers__preview"
            href={advice.slug}
          />
        )}
      </div>
    </div>
  )
}
function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(HeaderMixers)

import cx from 'classnames'
import { CardCategory, CardPreview, HeaderBar } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './ideas.scss'

function HeaderIdeas(props) {
  const {
    parentSelector,
    list,
    buttonText,
    title,
    slug,
    advice,
    onMouseLeave = () => {},
  } = props
  return (
    <div
      className={cx('header-item-ideas', {
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
      <div className="header-item-ideas__wrapper">
        {list.map((item, index) => (
          <CardCategory
            key={index}
            title={item.title}
            description={item.description}
            withButton={false}
            src={item.src}
            parentSelector="header-item-ideas__card"
            href={item.slug}
          />
        ))}
        {advice && (
          <CardPreview
            title={advice.title}
            note={advice.label}
            description={advice.description}
            src={advice.image.path}
            parentSelector="header-item-ideas__preview"
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
export default memo(HeaderIdeas)

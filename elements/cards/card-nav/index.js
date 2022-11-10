import cx from 'classnames'
import { H4, P, RouterLink } from 'elements'
import { memo } from 'react'
// import './card-nav.scss'

function CardNav(props) {
  const {
    title,
    list,
    listSlug = '',
    src,
    slug,
    parentSelector,
    onClick,
  } = props
  return (
    <div
      className={cx('card-nav', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div
        className="card-nav__image"
        style={{
          backgroundImage: src ? `url(${src})` : 'none',
        }}
      />
      <div className="card-nav__content">
        <RouterLink href={slug} onClick={onClick}>
          <H4 content={title} parentSelector="card-nav__title" />
        </RouterLink>
        {list.map((item, index) => (
          <RouterLink
            href={`${listSlug}${item.slug}`}
            key={item.id || index}
            onClick={onClick}
          >
            <P content={item.name} parentSelector="card-nav__link" />
          </RouterLink>
        ))}
      </div>
    </div>
  )
}

export default memo(CardNav)

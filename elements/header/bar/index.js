import cx from 'classnames'
import { H3, PairButton, RouterLink } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './bar.scss'

function HeaderBar({
  parentSelector,
  buttonText,
  title,
  slug = '/',
  onClick = () => {},
}) {
  return (
    <div
      className={cx('header-bar', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <H3 parentSelector="header-bar__title" content={title} />
      <RouterLink href={slug} onClick={onClick}>
        <PairButton parentSelector="header-bar__button" content={buttonText} />
      </RouterLink>
    </div>
  )
}

function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(HeaderBar)

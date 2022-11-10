import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './footer-sublink.scss'

function FooterSublink({ content, parentSelector }) {
  return (
    <p
      className={cx('footer-sublink', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {content}
    </p>
  )
}

function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(FooterSublink)

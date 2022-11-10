import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo, useCallback, useRef } from 'react'
// import './footer-link.scss'

function FooterLink({ content, parentSelector, withIcon, onExpand }) {
  const ref = useRef(null)
  const onClick = useCallback((ref, e) => {
    try {
      e.preventDefault()
      e.stopPropagation()
      if (ref.current) {
        onExpand(ref.current.parentElement, ref.current)
      }
    } catch (e) {}
  }, [])
  return (
    <p
      className={cx('footer-link', {
        [`${parentSelector}`]: parentSelector,
      })}
      ref={ref}
    >
      {content}
      {withIcon && (
        <span className="footer-link__icon" onClick={onClick.bind(this, ref)}>
          <span />
          <span />
        </span>
      )}
    </p>
  )
}

function equalFunc(prev, next) {
  return memoObj.byKey(prev, next, 'withIcon')
}
export default memo(FooterLink)

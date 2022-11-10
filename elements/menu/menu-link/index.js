import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo, useCallback, useRef } from 'react'
// import './menu-link.scss'

function MenuLink({ content, parentSelector, onExpand, isEmpty, onClick }) {
  const ref = useRef(null)
  const onClickRef = useCallback((ref, e) => {
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
      className={cx('menu-link', {
        [`${parentSelector}`]: parentSelector,
      })}
      ref={ref}
      onClick={onClick}
    >
      {content}
      {!isEmpty && (
        <span className="menu-link__icon" onClick={onClickRef.bind(this, ref)}>
          <span />
          <span />
        </span>
      )}
    </p>
  )
}

function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(MenuLink)

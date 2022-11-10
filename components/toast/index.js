import cx from 'classnames'
import { Portal } from 'components'
import React, { useEffect, useRef } from 'react'

function Toast({ isShown, setIsShown, text, delay = 35000 }) {
  const ref = useRef(null)
  useEffect(() => {
    if (isShown) {
      setTimeout(() => setIsShown(false), delay)
    }
  }, [isShown])
  return (
    <Portal>
      <div
        onClick={() => {
          setIsShown(false)
        }}
        ref={ref}
        className={cx('toast-wrapper', {
          'toast-wrapper-active': isShown,
        })}
      >
        <div>{text}</div>
        <div
          onClick={() => {
            setIsShown(false)
          }}
          className="exit-btn exit-btn--active toast-close"
        />
      </div>
    </Portal>
  )
}

export default Toast

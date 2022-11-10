import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'

// import './h1.scss'

function H1(props) {
  const { content, parentSelector, icon } = props
  return (
    <h1
      className={cx('h1', {
        [`${parentSelector}`]: parentSelector,
        [`button-pair`]: icon,
      })}
    >
      {content}
      {icon && (
        <button className="h1__icon button-pair__icon" type="button">
          {icon}
        </button>
      )}
    </h1>
  )
}

function equalFunc() {
  return memoObj.alwaysSkipRender()
}

export default memo(H1)

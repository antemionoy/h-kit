import cx from 'classnames'
import { memoObj } from 'helpers'
import { memo } from 'react'
// import './p.scss'

function Paragraph({ content, isTight, parentSelector, withHTML }) {
  if (withHTML) {
    return (
      <p
        className={cx('p', {
          'p--tight': isTight,
          [`${parentSelector}`]: parentSelector,
        })}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }
  return (
    <p
      className={cx('p', {
        'p--tight': isTight,
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {content}
    </p>
  )
}

function equalFunc(prev, next) {
  return memoObj.byContent(prev, next)
}
export default memo(Paragraph)

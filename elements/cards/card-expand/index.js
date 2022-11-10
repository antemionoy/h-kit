import cx from 'classnames'
import { P } from 'elements'
import { memo, useCallback, useRef, useState } from 'react'

function CardExpand(props) {
  const { parentSelector, title, description, onLikeClick = () => {} } = props
  const [isActive, setActive] = useState(null)
  const descriptionRef = useRef(null)
  const onExpand = useCallback((ref, isActive, e) => {
    try {
      setActive((prev) => !prev)
      const { current } = ref
      const { scrollHeight, style } = current
      if (!isActive) {
        style.height = `${scrollHeight}px`
        style.paddingTop = '24px'
        style.paddingBottom = '23px'
      } else {
        style.height = '0px'
        style.paddingTop = '0px'
        style.paddingBottom = '0px'
      }
    } catch (e) {}
  }, [])

  return (
    <div
      className={cx('card-expand', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="card-expand__header">
        <p className="card-expand__title">{title}</p>
        {/* <div className="card-expand__link" onClick={onLikeClick}>
          <Icon />
        </div> */}
      </div>
      <div className="card-expand__description" ref={descriptionRef}>
        <P content={description} />
      </div>
      <div
        className="card-expand__toggler"
        onClick={onExpand.bind(this, descriptionRef, isActive)}
      >
        {isActive && 'Свернуть'}
        {!isActive && 'Подробнее'}
      </div>
    </div>
  )
}

export default memo(CardExpand)

import cx from 'classnames'
import { forwardRef } from 'react'

const Modal = forwardRef(
  ({ parentSelector, children, className, onClose }, ref) => {
    return (
      <div ref={ref} className={`modal ${className}`}>
        <div className="modal__body-wrapper">
          <div className="modal__body-content">
            <div
              className="modal__close exit-btn exit-btn--active exit-btn--lg"
              onClick={onClose}
            />
            <div
              className={cx('modal__body', {
                [`${parentSelector}`]: parentSelector,
              })}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default Modal

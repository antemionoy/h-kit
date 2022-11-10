import cx from 'classnames'
import Link from 'next/link'

function RouteLink({
  href,
  as,
  children,
  parentSelector,
  disableKeyboard,
  ariaLabel,
  onClick,
}) {
  return (
    <>
      {href && (
        <Link href={href} as={as}>
          <a
            className={cx('router-link', {
              [`${parentSelector}`]: parentSelector,
            })}
            tabIndex={disableKeyboard ? '-1' : '0'}
            aria-label={ariaLabel}
            onClick={onClick}
          >
            {children}
          </a>
        </Link>
      )}
      {!href && (
        <div
          className={cx('router-link', {
            [`${parentSelector}`]: parentSelector,
          })}
        >
          {children}
        </div>
      )}
    </>
  )
}

export default RouteLink

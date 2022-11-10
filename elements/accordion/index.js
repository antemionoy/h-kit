import cx from 'classnames'
import { PATH } from 'config/path'
import { CardAdvice, Image } from 'elements'
import { createRef, useRef } from 'react'

const LINK_ACTIVE_CLASS = 'accordion__header--active'

function Accordion({ parentSelector, list = [] }) {
  const refs = useRef([])
  const arrLength = list.length

  if (refs.current.length !== arrLength) {
    refs.current = Array(arrLength)
      .fill()
      .map((_, i) => refs.current[i] || createRef())
  }

  const onExpand = (target) => {
    const { classList, nextElementSibling: domList } = target
    if (classList.contains(LINK_ACTIVE_CLASS)) {
      classList.remove(LINK_ACTIVE_CLASS)
    } else {
      classList.add(LINK_ACTIVE_CLASS)
    }
  }
  const onClick = (ref, e) => {
    e.preventDefault()
    e.stopPropagation()
    if (ref.current) {
      onExpand(ref.current)
    }
  }

  return (
    <ul
      className={cx('accordion', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {list.map((item, index) => (
        <li className="accordion__item" key={item.id}>
          <div
            className="accordion__header h4"
            ref={refs.current[index]}
            onClick={onClick.bind(this, refs.current[index])}
          >
            {item.question}
            <span className="accordion__icon icon-plus icon-plus--small" />
          </div>
          <div className="accordion__content">
            <div className="grid">
              <div
                className="grid__col grid__col--lg text-block p"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
              {item.card && (
                <div className="grid__col grid__col--sm">
                  <CardAdvice
                    title={item.card.title}
                    note={item.card.note}
                    src={item.card.src}
                    parentSelector="card-advice--small"
                    href={`${PATH.IDEAS}/${item.card.slug}`}
                  />
                </div>
              )}
              {item.image && (
                <div className="grid__col grid__col--sm">
                  <Image 
                    src={item.image.path.normal}
                    srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Accordion

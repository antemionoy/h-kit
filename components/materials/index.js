import cx from 'classnames'
import { CardMaterial, H2, PairButton } from 'elements'
import { throttle } from 'helpers'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function Materials({ title, list, buttonText, slug }) {
  const [activeMaterial, setActiveMaterial] = useState(list[0].id || 1)
  const isDesktop = useSelector((state) => state.breakpoint.isDesktop)

  function onMouseEvent(id) {
    throttleFunc(id)
  }
  const throttleFunc = throttle((id) => {
    if (id === activeMaterial || !isDesktop) {
      return
    }
    setActiveMaterial(id)
  }, 100)

  return (
    <div className="main__materials materials">
      <H2 content={title} parentSelector="materials__title" />
      <div className="materials__wrapper">
        {isDesktop && (
          <div className="materials__images">
            {list.map((item) => {
              const isActive = item.id === activeMaterial
              return (
                <div
                  className={cx('materials__image', {
                    'materials__image--active': isActive,
                  })}
                  key={item.id}
                  style={{
                    backgroundImage: item.image.path.normal
                      ? `url(${item.image.path.normal})`
                      : 'none',
                  }}
                />
              )
            })}
          </div>
        )}
        <div className="materials__list">
          {list.map((item) => {
            const isActive = item.id === activeMaterial
            return (
              <CardMaterial
                key={item.id}
                parentSelector="materials__item"
                title={item.title}
                description={item.description}
                src={item.miniature.path.normal}
                onMouseEnter={onMouseEvent.bind(this, item.id)}
                isActive={isActive}
                href={item.slug}
              />
            )
          })}
        </div>
      </div>
      {slug && <PairButton content={buttonText} href={slug} />}
    </div>
  )
}

export default Materials

import { H2, H4, Image, P } from 'elements'
import { throttle } from 'helpers'
import { useCallback, useRef } from 'react'

function Step5({ data }) {
  const { title, description, caption, srcMain, srcCommon } = data

  const containerRef = useRef(null)
  const controlRef = useRef(null)
  const imageRef = useRef(null)
  const mouseUpRef = useRef(null)

  function onMouseEvent(e) {
    e.persist()
    throttleFunc(e)
  }
  const onMouseDown = useCallback((e) => {
    if (e.target === controlRef.current) {
      mouseUpRef.current = true
    }
  })
  const onMouseUp = useCallback((e) => {
    mouseUpRef.current = false
  })

  const throttleFunc = throttle((e) => {
    if (containerRef.current && controlRef.current && mouseUpRef.current) {
      if (e.type === 'mouseleave') {
        mouseUpRef.current = false
        return
      }
      let { clientX } = e
      if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX
      }
      const {
        current,
        current: { clientWidth },
      } = containerRef
      const {
        current: currentControl,
        current: { clientWidth: clientWidthControl },
      } = controlRef
      const { left } = current.getBoundingClientRect()
      const widthOffset = clientWidth / 2
      let x = clientX - left - widthOffset
      if (clientX - clientWidthControl / 2 < left) {
        x = left - left - widthOffset + clientWidthControl / 2
      }
      if (clientX + clientWidthControl / 2 > left + clientWidth) {
        x = clientWidth / 2 - clientWidthControl / 2
      }
      imageRef.current.style.width = `${
        (100 * (clientWidth / 2 + x)) / clientWidth
      }%`
      currentControl.parentElement.parentElement.style.transform = `translateX(${
        (100 * x) / clientWidth
      }%)`
    }
  }, 60)

  return (
    <div className="step-5">
      <H4 parentSelector="step-5__caption" content={caption} />
      <div className="step-5__content">
        <H2 parentSelector="step-5__title" content={title} />
        <P parentSelector="step-5__description" content={description} />
      </div>
      <div
        className="step-5__images"
        ref={containerRef}
        onMouseMove={onMouseEvent}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchMove={onMouseEvent}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        role="img"
      >
        <Image  className="step-5__images-main" src={srcMain} />
        <div
          className="step-5__images-common"
          ref={imageRef}
          style={{ backgroundImage: `url(${srcCommon})` }}
        />
        <div className="step-5__images-drag-wrapper">
          <div className="step-5__images-drag">
            <div className="step-5__images-control" ref={controlRef}>
              <div className="step-5__images-dot" />
              <div className="step-5__images-dot" />
              <div className="step-5__images-dot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Step5

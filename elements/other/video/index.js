import cx from 'classnames'
import { H3, H5, Image, PlayButton } from 'elements'
import { debounce, validateURL } from 'helpers'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
function VideoBlock(props, ref) {
  const [isReady, setIsReady] = useState(false)
  const playerDomRef = useRef(null)
  const playerRef = useRef(null)
  const wrapperRef = useRef(null)
  const timerRef = useRef(null)
  const {
    title,
    description,
    videoId,
    posterSrc,
    parentSelector,
    isMini,
  } = props

  const onResize = useCallback(
    debounce(() => {
      try {
        playerDomRef.current.width = wrapperRef.current.offsetWidth
        playerDomRef.current.height = wrapperRef.current.offsetHeight
      } catch (e) {}
    }, 200),
    []
  )

  const onPlayerReady = useCallback((event) => {
    try {
      setIsReady(true)
      const ref = event.target
      if (ref.f) {
        playerDomRef.current = ref.f
      }
      playerDomRef.current.classList.add('video-block__video--active')
      ref.playVideo()
    } catch (e) {}
  }, [])

  useEffect(() => {
    if (window && isReady) {
      window.addEventListener('resize', onResize.bind(this, playerRef.current))
      return () =>
        window.removeEventListener(
          'resize',
          onResize.bind(this, playerRef.current)
        )
    }

    if (playerRef?.current && ref) {
      ref.current = playerRef.current
    }
  }, [isReady])

  const [fullscreen, setFullScreen] = useState(false)

  useEffect(() => {
    ;[
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'msfullscreenchange',
    ].forEach((eventType) =>
      document.addEventListener(eventType, (e) => {
        if (document.fullscreenElement) {
          setFullScreen(true)
        } else {
          setFullScreen(false)
        }
      })
    )
  }, [])

  const onStateChange = (event) => {
    try {
      const { data } = event
      if ((data === 2 || data === 0) && !fullscreen) {
        timerRef.current = setTimeout(() => {
          if (playerDomRef.current) {
            playerDomRef.current.classList.remove('video-block__video--active')
          } else if (playerRef.current) {
            playerRef.current.classList.remove('video-block__video--active')
          }
        }, 250)
      }
      if (data === 3 || data === 1) {
        clearTimeout(timerRef.current)
      }
    } catch (e) {}
  }

  const onPlayVideo = useCallback(() => {
    if (!window) return

    if (isLink) {
      if (playerRef.current) {
        playerRef.current.play()
        playerRef.current.classList.add('video-block__video--active')
      }
      return
    }

    if (playerDomRef.current && playerRef.current) {
      playerRef.current.playVideo()
      playerDomRef.current.classList.add('video-block__video--active')
      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new YT.Player('player', {
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight,
        videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange,
        },
      })
    }
  }, [])
  const isLink = validateURL(videoId)

  if (!videoId) return null
  return (
    <div
      className={cx('video-block', {
        'video-block--mini': isMini,
        [`${parentSelector}`]: parentSelector,
      })}
      ref={wrapperRef}
    >
      <PlayButton parentSelector="video-block__button" onClick={onPlayVideo} />
      {description && (
        <H5 parentSelector="video-block__caption" content={description} />
      )}
      <H3 parentSelector="video-block__title" content={title} />
      <Image
        src={posterSrc.normal}
        srcSet={`${posterSrc.normal} 1x, ${posterSrc.retina} 2x`}
        className="video-block__poster"
        alt={title}
      />
      {isLink ? (
        <video
          className="video-block__video"
          src={videoId}
          ref={playerRef}
          controls
          style={{
            objectFit: 'cover',
          }}
          onPlay={(e) => {
            onStateChange({ data: 1 })
          }}
          onPause={(e) => {
            onStateChange({ data: 2 })
          }}
          onEnded={(e) => {
            onStateChange({ data: 0 })
          }}
        />
      ) : (
        <div className="video-block__video" id="player" />
      )}
    </div>
  )
}

export default forwardRef(VideoBlock)

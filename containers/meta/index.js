import Head from 'next/head'
import { useEffect, useState } from 'react'
import { detectWidthBreakpoint, throttle } from 'helpers'

export default function Meta() {
  const [windowWidth, setWindowWidth] = useState(1920)
  useEffect(() => {
    const onResize = throttle(() => {
      if (window.innerWidth < 320) {
        setWindowWidth(320)
      } else {
        setWindowWidth(window.innerWidth)
      }
    }, 100)
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return (
    <>
      <Head>
        <meta
          name="viewport"
          id="viewport"
          content={
            windowWidth <= 320
              ? 'width=320'
              : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          }
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    </>
  )
}

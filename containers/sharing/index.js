import { useMutation } from '@apollo/client'
import cx from 'classnames'
import FAVORITES_SAVE_MUTATION from 'graphql/mutations/favorites_save.graphql'
import IconFB from 'public/icons/share-fb-icon.svg'
import IconLink from 'public/icons/share-link-icon.svg'
import IconTg from 'public/icons/share-tg-icon.svg'
import IconVk from 'public/icons/share-vk-icon.svg'
import { createElement } from 'react'

function Sharing({
  content,
  parentSelector,
  path,
  favs,
  sharedSlug,
  setToast = () => {},
}) {
  const [sendFavsInit, { loading }] = useMutation(FAVORITES_SAVE_MUTATION)
  const sendFavs = async (e) => {
    if (!loading) {
      return await sendFavsInit(e)
    }
    return 'loading'
  }

  function copyLink(link) {
    const textField = document.createElement('textarea')
    textField.innerText = link
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  const checkFavs = () => {
    const isEmpty = Object.values(favs).every((x) => x.length === 0)
    if (isEmpty) {
      setToast({
        text: 'Добавьте что-нибудь в избранное',
        show: true,
      })
    }
    return isEmpty
  }

  const handleClick = async () => {
    if (!favs) {
      copyLink(path)
      setToast({ text: 'Ссылка скопирована', show: true })
    }
    if (favs) {
      if (checkFavs()) return
      try {
        await sendFavs({
          variables: {
            ...favs,
          },
        }).then(({ data }) => {
          if (data === 'loading') {
            return
          }
          if (data?.FavoriteSave?.slug) {
            copyLink(`${path}${data.FavoriteSave.slug}`)
            setToast({ text: 'Ссылка скопирована', show: true })
          } else {
            setToast({
              text: 'Не удалось сгенерировать ссылку, попробуйте позже',
              show: true,
            })
          }
        })
      } catch (error) {
        setToast({
          text: 'Не удалось сгенерировать ссылку, попробуйте позже',
          show: true,
        })
      }
    }
    if (sharedSlug) {
      copyLink(`${path}${sharedSlug}`)
      setToast({ text: 'Ссылка скопирована', show: true })
    }
  }

  const handleFavClick = async (shareLink) => {
    if (favs) {
      if (checkFavs()) return
      try {
        await sendFavs({
          variables: {
            ...favs,
          },
        }).then(({ data }) => {
          if (data?.FavoriteSave?.slug) {
            window.open(
              `${shareLink}${path}${data.FavoriteSave.slug}`,
              '_ blank'
            )
          } else {
            setToast({
              text: 'Не удалось сгенерировать ссылку, попробуйте позже',
              show: true,
            })
          }
        })
      } catch (error) {
        setToast({
          text: 'Не удалось сгенерировать ссылку, попробуйте позже',
          show: true,
        })
      }
    }
    if (sharedSlug) {
      window.open(`${shareLink}${path}${sharedSlug}`, '_ blank')
    }
  }

  return (
    <div
      className={cx('sharing', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <p className="h4 sharing__title">{content}</p>
      <div className="sharing__list">
        <div
          className="sharing__item"
          aria-label="Поделиться"
          onClick={handleClick}
        >
          {createElement(IconLink)}
        </div>
        {path && !favs && !sharedSlug && (
          <>
            <a
              className="sharing__item"
              href={`https://telegram.me/share/url?url=${path}`}
              aria-label="Телеграм"
              target="_blank"
              rel="noreferrer"
            >
              {createElement(IconTg)}
            </a>
            <a
              className="sharing__item"
              href={`https://vk.com/share.php?url=${path}`}
              aria-label="Вконтакте"
              target="_blank"
              rel="noreferrer"
            >
              {createElement(IconVk)}
            </a>
            <a
              className="sharing__item"
              href={`https://www.facebook.com/sharer/sharer.php?u=${path}`}
              aria-label="Фэйсбук"
              target="_blank"
              rel="noreferrer"
            >
              {createElement(IconFB)}
            </a>
          </>
        )}
        {path && (favs || sharedSlug) && (
          <>
            <button
              type="button"
              className="sharing__item"
              onClick={() =>
                handleFavClick(`https://telegram.me/share/url?url=`)
              }
            >
              {createElement(IconTg)}
            </button>
            <button
              type="button"
              className="sharing__item"
              onClick={() => handleFavClick(`https://vk.com/share.php?url=`)}
            >
              {createElement(IconVk)}
            </button>
            <button
              type="button"
              className="sharing__item"
              onClick={() =>
                handleFavClick(`https://www.facebook.com/sharer/sharer.php?u=`)
              }
            >
              {createElement(IconFB)}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Sharing

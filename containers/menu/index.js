import cx from 'classnames'
import { PATH } from 'config/path'
import { SUBMENU_DICTIONARY } from 'config/static/header'
import mock from 'config/static/menu'
import { Geo, MenuLink, NavLink, P, PairButton, RouterLink } from 'elements'
import { throttle } from 'helpers'
import Icon from 'public/icons/menu-favorite-icon.svg'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { useModal } from 'helpers/useModal'

import { Modal } from 'components'
import { Order } from 'containers'
// import './menu.scss'

const LINK_ACTIVE_CLASS = 'menu-link--active'

function Menu({
  kitchenFilter,
  materialCategories,
  sinksCategories,
  technicsCategories,
  isMenuOpen,
  toggleMenu,
  geo,
  hasScroll,
  setHasScroll,
  closeMenu,
}) {
  const {
    cities,
    nav,
    favorite,
    contacts: { order, guarantee, binding },
  } = mock
  let { list } = mock
  const isDesktop = useSelector((state) => state.breakpoint.isDesktop)

  const { modalRef, openModal, closeModal, isModalOpen } = useModal()

  const onClose = () => {
    closeMenu()
  }
  const onOutsideClose = useCallback((e) => {
    try {
      if (!e.target.closest('.menu') && !e.target.closest('.header')) {
        onClose()
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    document.addEventListener('click', onOutsideClose)
    return () => document.removeEventListener('click', onOutsideClose)
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      onClose()
    }
  }, [isModalOpen])

  const onExpand = useCallback((length, parent, target) => {
    if (!length) {
      return
    }
    try {
      const { classList } = target
      const { nextElementSibling: domList } = parent
      const { scrollHeight, style } = domList
      if (classList.contains(LINK_ACTIVE_CLASS)) {
        classList.remove(LINK_ACTIVE_CLASS)
        style.height = '0px'
        style.paddingTop = '0px'
      } else {
        classList.add(LINK_ACTIVE_CLASS)
        style.height = `${scrollHeight}px`
        style.paddingTop = '25px'
      }
    } catch (e) {}
  })
  const onScroll = useCallback(
    throttle((hasScroll) => {
      if (!hasScroll) {
        setHasScroll(true)
      }
    }, 100),
    []
  )

  const { activeContact } = useSelector((state) => state)
  const phone = activeContact && activeContact.phone

  if (isDesktop) {
    return null
  }
  const formatCategory = (path) => (category) => ({
    ...category,
    sublist: category.tags.map((tag) => ({
      ...tag,
      slug: `${path}?group=${category.slug}&tags=${tag.slug}`,
    })),
    title: category.name,
    slug: `${path}?group=${category.slug}`,
  })
  if (materialCategories && sinksCategories && technicsCategories) {
    list = [
      list[0],
      {
        ...list[1],
        list: materialCategories?.map(formatCategory(PATH.MATERIALS)),
      },
      { ...list[2], list: sinksCategories?.map(formatCategory(PATH.SINKS)) },
      {
        ...list[3],
        list: technicsCategories?.map(formatCategory(PATH.TECHNICS)),
      },
      ...list.slice(4),
    ]
  }

  return (
    <>
      <div
        className={cx('menu', {
          'menu--active': isMenuOpen,
        })}
      >
        <div
          className={cx('menu__close exit-btn', {
            'exit-btn--active': isMenuOpen,
          })}
          onClick={onClose}
        />
        <div
          className="menu__wrapper"
          onScroll={onScroll.bind(this, hasScroll)}
        >
          <Geo parentSelector="menu__geo" {...geo} />
          <RouterLink
            parentSelector="menu__favorite"
            href={favorite.slug}
            onClick={onClose}
          >
            <Icon />
            <span>{favorite.title}</span>
          </RouterLink>
          <div className="menu__catalog">
            {list.map((item, index) => (
              <div className="menu__catalog-item" key={index}>
                <RouterLink
                  href={item.slug}
                  parentSelector="menu__catalog-link"
                >
                  <MenuLink
                    onExpand={onExpand.bind(this, item.list.length)}
                    content={item.title}
                    isEmpty={item.list.length === 0}
                    onClick={onClose}
                  />
                </RouterLink>
                <div className="menu__catalog-list">
                  {item.list.map((sublink) => {
                    const currentFilter = SUBMENU_DICTIONARY[sublink.title]
                    return (
                      <div
                        key={sublink.title}
                        className="menu__catalog-second-list"
                      >
                        <RouterLink href={sublink.slug} onClick={onClose}>
                          <P
                            content={sublink.title}
                            parentSelector="menu__catalog-second-link"
                          />
                        </RouterLink>
                        <div className="menu__catalog-sublist">
                          {currentFilter &&
                            kitchenFilter &&
                            kitchenFilter[currentFilter].map((nestedLink) => (
                              <RouterLink
                                href={`${PATH.KITCHENS}/?${currentFilter}=${nestedLink.slug}`}
                                parentSelector="menu__catalog-nested"
                                key={nestedLink.slug}
                                onClick={onClose}
                              >
                                <p>{nestedLink.name}</p>
                              </RouterLink>
                            ))}
                          {!currentFilter &&
                            sublink.sublist &&
                            sublink.sublist.map((nestedLink, id) => (
                              <RouterLink
                                href={nestedLink.slug || sublink.slug}
                                parentSelector="menu__catalog-nested"
                                key={nestedLink.title || nestedLink.name}
                                onClick={onClose}
                              >
                                <p>{nestedLink.title || nestedLink.name}</p>
                              </RouterLink>
                            ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="menu__nav">
            {nav.map((item, index) => (
              <RouterLink
                href={item.slug}
                key={index}
                parentSelector="menu__nav-link"
                onClick={onClose}
              >
                <NavLink content={item.name} />
              </RouterLink>
            ))}
          </div>
          <div className="menu__contacts">
            <div className="menu__contacts-item">
              <p className="menu__contacts-description">{order.title}</p>
              <a
                className="menu__contacts-phone"
                href={`tel:${phone && phone.replace(/[\ \+\(\)\-]+/gi, '')}`}
              >
                {phone}
              </a>
              <p className="menu__contacts-caption">{order.caption}</p>
            </div>
            <div className="menu__contacts-item">
              <p className="menu__contacts-description">{guarantee.title}</p>
              <a
                className="menu__contacts-phone"
                href={`tel:${guarantee.link}`}
              >
                {guarantee.number}
              </a>
              <p className="menu__contacts-caption">{guarantee.caption}</p>
            </div>
            <div className="menu__contacts-item">
              <PairButton
                content={binding.title}
                parentSelector="menu__contacts-button"
                onClick={openModal}
              />
              <p className="menu__contacts-caption">{binding.caption}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className={isModalOpen ? 'modal--active' : ''}
        onClose={closeModal}
        parentSelector="modal-form kitchen-modal"
        ref={modalRef}
      >
        <Order
          title={binding.formTitle}
          hasKitchen={false}
          onSubmit={closeModal}
        />
      </Modal>
    </>
  )
}

export default Menu

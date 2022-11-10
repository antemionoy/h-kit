import { useQuery } from '@apollo/client'
import cx from 'classnames'
import { Toast } from 'components'
import headerData from 'config/static/header'
import { HeaderForm } from 'containers'
import {
  Burger,
  CategoryLink,
  Geo,
  HeaderCatalog,
  HeaderIdeas,
  HeaderMaterials,
  HeaderMixers,
  HeaderStocks,
  HeaderTechnique,
  Logo,
  NavLink,
  RouterLink,
} from 'elements'
import KITCHENS_LIST_QUERY from 'graphql/queries/kitchens_list.graphql'
import IDEA_NAVS_QUERY from 'graphql/queries/shared/header/idea_navs.graphql'
import { throttle } from 'helpers'
import { useRouter } from 'next/router'
import Icon from 'public/icons/menu-close-icon.svg'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

function Header({
  kitchenFilter,
  materialCategories,
  sinksCategories,
  technicsCategories,
  isMenuOpen,
  toggleMenu = () => {},
  geo,
  setHasScroll,
  hasScroll,
}) {
  const router = useRouter()
  const { nav, favorite, logo, list, content } = headerData
  const { catalog, materials, mixers, technique, ideas, stocks } = content
  const isDesktop = useSelector((state) => state.breakpoint.isDesktop)
  const [activeNavItem, setActiveNavItem] = useState('')
  const [isFixed, setIsFixed] = useState(false)
  const [toast, setToast] = useState({
    show: false,
    text: 'Не удалось отправить, попробуйте позже',
  })
  const timerRef = useRef(null)

  const { data: kitchenCollectionsData } = useQuery(KITCHENS_LIST_QUERY, {
    variables: { limit: 2 },
  })

  const { data: ideaNavsData } = useQuery(IDEA_NAVS_QUERY)
  useEffect(() => {
    if (document && isDesktop) {
      document.addEventListener('scroll', onScroll)
      return () => {
        document.removeEventListener('scroll', onScroll)
      }
    }
  }, [isDesktop])

  const onScroll = useCallback(
    throttle(() => {
      const currentScroll = document.documentElement.scrollTop
      setHasScroll(true)
      if (currentScroll > 40) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }, 100),
    []
  )

  const onSetActiveNavItem = useCallback((name, e) => {
    const { relatedTarget } = e
    try {
      const itemCondition = relatedTarget.classList.contains('header-item')
      const linkCondition = relatedTarget.classList.contains('category-link')
      if (itemCondition || linkCondition) {
        if (name) {
          setActiveNavItem(name)
          return
        }
        return
      }
      if (name.length) {
        timerRef.current = setTimeout(() => {
          setActiveNavItem(name)
          document.body.classList.add('menu-open')
        }, 250)
      } else {
        clearTimeout(timerRef.current)
        setActiveNavItem('')
        document.body.classList.remove('menu-open')
      }
    } catch (e) {
      document.body.classList.remove('menu-open')
      setActiveNavItem('')
    }
  }, [])

  useEffect(() => {
    document.body.classList.remove('menu-open')
  }, [router.query])
  return (
    <>
      <Toast
        text={toast.text}
        isShown={toast.show}
        setIsShown={(show) => {
          setToast({ ...toast, show })
        }}
      />
      <header className="header">
        <div
          className={cx('header-fixed', {
            'header-fixed--top': isFixed && isDesktop,
          })}
        >
          {isDesktop && (
            <div className="header__wrapper">
              <nav className="header__topLine header-topLine container ">
                <Geo parentSelector="header-topLine__item" {...geo} />
                <div className="header-topLine__item header-topLine__item--nav">
                  {nav.map((item, index) => (
                    <RouterLink
                      href={item.slug}
                      key={index}
                      parentSelector="header-topLine__link"
                    >
                      <NavLink content={item.name} />
                    </RouterLink>
                  ))}
                  <RouterLink
                    href={favorite.slug}
                    parentSelector="header-topLine__link"
                  >
                    <NavLink content={favorite.name} isBold />
                  </RouterLink>
                </div>
              </nav>
            </div>
          )}
          <div className="header__nav">
            <div className="container header-nav">
              {!isDesktop && (
                <Burger
                  parentSelector="header-nav__burger"
                  isActive={isMenuOpen}
                  onClick={toggleMenu}
                />
              )}
              <div className="header-nav__logo-wrap">
                <RouterLink
                  href="/"
                  parentSelector="header-nav__logo-link"
                  ariaLabel="heime"
                >
                  <Logo
                    parentSelector="header-nav__logo"
                    text={logo.text}
                    isDesktop={isDesktop}
                  />
                </RouterLink>
              </div>
              <nav className="header-nav__wrapper">
                {isDesktop &&
                  list.map((item, index) => (
                    <RouterLink
                      href={item.slug}
                      key={index}
                      parentSelector="header-nav__link"
                      onClick={onSetActiveNavItem.bind(this, '')}
                    >
                      <CategoryLink
                        content={item.name}
                        onMouseEnter={onSetActiveNavItem.bind(
                          this,
                          item.contentKey
                        )}
                        onMouseLeave={onSetActiveNavItem.bind(this, '')}
                        isActive={activeNavItem === item.contentKey}
                      />
                    </RouterLink>
                  ))}
                <HeaderForm
                  toast={toast}
                  setToast={setToast}
                  parentSelector="header-nav__form"
                />
              </nav>
            </div>
          </div>
          {isDesktop && (
            <div
              className={cx('header__menu header-menu', {
                'header-menu--active': activeNavItem,
              })}
            >
              <div
                className="header-menu__close"
                onMouseLeave={onSetActiveNavItem.bind(this, '')}
              >
                <Icon />
              </div>
              {activeNavItem === 'catalog' && (
                <HeaderCatalog
                  buttonText={catalog.buttonText}
                  title={catalog.title}
                  slug={catalog.slug}
                  list={catalog.list}
                  parentSelector="header-item container"
                  onMouseLeave={onSetActiveNavItem.bind(this, '')}
                  cards={kitchenCollectionsData?.kitchens.data}
                  kitchenFilter={kitchenFilter}
                />
              )}
              {activeNavItem === 'materials' && (
                <HeaderMaterials
                  buttonText={materials.buttonText}
                  title={materials.title}
                  slug={materials.slug}
                  list={materials.list}
                  parentSelector="header-item container"
                  onMouseLeave={onSetActiveNavItem.bind(this, '')}
                  materialCategories={materialCategories}
                />
              )}
              {activeNavItem === 'mixers' && (
                <HeaderMixers
                  buttonText={mixers.buttonText}
                  title={mixers.title}
                  slug={mixers.slug}
                  list={mixers.list}
                  advice={
                    ideaNavsData?.idea_navs?.filter((i) => i.type === 'sink')[0]
                      ?.article
                  }
                  parentSelector="header-item container"
                  sinksCategories={sinksCategories}
                  onMouseLeave={onSetActiveNavItem.bind(this, '')}
                />
              )}
              {activeNavItem === 'technique' && (
                <HeaderTechnique
                  buttonText={technique.buttonText}
                  title={technique.title}
                  slug={technique.slug}
                  list={technique.list}
                  technicsCategories={technicsCategories}
                  parentSelector="header-item container"
                  onMouseLeave={onSetActiveNavItem.bind(this, '')}
                />
              )}
              {activeNavItem === 'ideas' && (
                <HeaderIdeas
                  buttonText={ideas.buttonText}
                  title={ideas.title}
                  slug={ideas.slug}
                  list={ideas.list}
                  advice={
                    ideaNavsData?.idea_navs?.filter((i) => i.type === 'idea')[0]
                      ?.article
                  }
                  parentSelector="header-item container"
                  onMouseLeave={onSetActiveNavItem.bind(this, '')}
                />
              )}
              {activeNavItem === 'stocks' && (
                <HeaderStocks
                  buttonText={stocks.buttonText}
                  title={stocks.title}
                  slug={stocks.slug}
                  list={stocks.list}
                  parentSelector="header-item container"
                  onMouseLeave={onSetActiveNavItem.bind(this, '')}
                />
              )}
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default Header

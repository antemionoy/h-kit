import { useQuery, useApolloClient } from '@apollo/client'
import cx from 'classnames'
import { Footer, Header, Menu, Meta } from 'containers'
import CONTACTS_QUERY from 'graphql/queries/contacts/contacts.graphql'
import MATERIALS_CATEGORIES_QUERY from 'graphql/queries/materials/materials_categories.graphql'
import KITCHEN_FILTER_QUERY from 'graphql/queries/shared/header/kitchen_filter.graphql'
import SINKS_CATEGORIES_QUERY from 'graphql/queries/sinks/sinks_categories.graphql'
import TECHNICS_CATEGORIES_QUERY from 'graphql/queries/technics/technics_categories.graphql'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import * as actions from 'redux/actions'
import Head from 'next/head'

function scrollBarPadding() {
  try {
    return window.innerWidth - document.documentElement.clientWidth
  } catch (e) {
    return 0
  }
}

function Layout({ parentSelector, children, removeFooterTopMargin }) {
  const apolloClient = useApolloClient()
  const { contacts, activeContact } = useSelector((state) => state)
  const { data: kitchenFilterData } = useQuery(KITCHEN_FILTER_QUERY)
  const { data: materialCategoriesData } = useQuery(MATERIALS_CATEGORIES_QUERY)
  const { data: sinksCategoriesData } = useQuery(SINKS_CATEGORIES_QUERY)
  const { data: technicsCategoriesData } = useQuery(TECHNICS_CATEGORIES_QUERY)
  const { data: contactsData } = useQuery(CONTACTS_QUERY)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.paddingRight = `${scrollBarPadding()}px`
      document.body.style.overflow = `hidden`
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.style.paddingRight = `${0}px`
      document.body.style.overflow = ``
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMenuOpen])
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const dispatch = useDispatch()
  const [hasScroll, setHasScroll] = useState(false)
  const onSetActiveCity = (contact) => {
    Cookies.set('city', JSON.stringify(activeContact), { expires: 7 })
    dispatch(actions.setActiveContact(contact))
  }
  useEffect(() => {
    Cookies.set('city', JSON.stringify(activeContact), { expires: 7 })
    apolloClient.resetStore()
  }, [activeContact])

  const onResetHasScroll = () => {
    setHasScroll(false)
  }
  return (
    <>
      <div
        className={cx('pagewrapper', {
          [`${parentSelector}`]: parentSelector,
        })}
      >
        <Meta />
        <Header
          kitchenFilter={kitchenFilterData?.kitchen_filter}
          materialCategories={materialCategoriesData?.material_categories}
          sinksCategories={sinksCategoriesData?.sinks_categories}
          technicsCategories={technicsCategoriesData?.technics_categories}
          contactsCities={contactsData?.contacts || []}
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
          geo={{
            list: contacts,
            onClick: onSetActiveCity,
            activeCity: activeContact.city,
            hasScroll,
            onResetHasScroll,
          }}
          setHasScroll={setHasScroll}
        />
        <Menu
          kitchenFilter={kitchenFilterData?.kitchen_filter}
          materialCategories={materialCategoriesData?.material_categories}
          sinksCategories={sinksCategoriesData?.sinks_categories}
          technicsCategories={technicsCategoriesData?.technics_categories}
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
          geo={{
            list: contacts,
            onClick: onSetActiveCity,
            activeCity: activeContact.city,
            hasScroll,
            onResetHasScroll,
          }}
          hasScroll={hasScroll}
          setHasScroll={setHasScroll}
          closeMenu={() => setIsMenuOpen(false)}
        />
        {children}
        <Footer
          kitchenFilter={kitchenFilterData?.kitchen_filter}
          materialCategories={materialCategoriesData?.material_categories}
          sinksCategories={sinksCategoriesData?.sinks_categories}
          technicsCategories={technicsCategoriesData?.technics_categories}
          removeFooterTopMargin={removeFooterTopMargin}
        />
      </div>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-ND7RM7N"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </>
  )
}

export default Layout

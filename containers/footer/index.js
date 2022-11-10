import { Toast } from 'components'
import { PATH } from 'config/path'
import mock from 'config/static/footer'
import { FooterLink, FooterSublink, Image, RouterLink } from 'elements'
import { useRouter } from 'next/router'
import InstIcon from 'public/icons/inst-icon.svg'
import IconLogo from 'public/icons/logo.svg'
import IconNimax from 'public/icons/nimax.svg'
import VkIcon from 'public/icons/vk-icon.svg'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { HeaderForm } from '../index'

// import './footer.scss'

const LINK_ACTIVE_CLASS = 'footer-link--active'

function Footer({
  kitchenFilter,
  materialCategories,
  sinksCategories,
  technicsCategories,
  removeFooterTopMargin,
}) {
  const {
    catalog,
    materials,
    technique,
    mixers,
    buyer,
    process,
    about,
    payment,
    contacts,
    basement,
  } = mock
  const [toast, setToast] = useState({
    show: false,
    text: 'Не удалось отправить, попробуйте позже',
  })
  const router = useRouter()
  const { order, guarantee, binding, delivery, social, payments } = contacts
  const { logo, nimax, links } = basement
  const isDesktop = useSelector((state) => state.breakpoint.isDesktop)
  const onExpand = useCallback((parent, target) => {
    try {
      const { classList } = target
      const { nextElementSibling: domList } = parent
      const { scrollHeight, style } = domList
      if (classList.contains(LINK_ACTIVE_CLASS)) {
        classList.remove(LINK_ACTIVE_CLASS)
        style.height = '0px'
        style.paddingBottom = '0px'
      } else {
        classList.add(LINK_ACTIVE_CLASS)
        style.height = `${scrollHeight}px`
        style.paddingBottom = '20px'
      }
    } catch (e) {}
  }, [])

  const linkTo = (href, query) => {
    router.push({ pathname: href, query })
    window.scrollTo(0, 0)
  }

  const { activeContact } = useSelector((state) => state)
  const phone = activeContact && activeContact.phone
  return (
    <>
      <Toast
        text={toast.text}
        isShown={toast.show}
        setIsShown={(show) => {
          setToast({ ...toast, show })
        }}
      />
      <footer
        className={`footer ${
          !removeFooterTopMargin ? 'footer--topmargin' : ''
        }`}
      >
        <div className="footer__wrapper container">
          <div className="footer__column">
            <div className="footer__item footer-grid footer-grid--catalog footer-grid--catalog-first">
              <div
                className="footer-grid__link"
                onClick={() => linkTo(PATH.KITCHENS)}
              >
                <FooterLink
                  withIcon={!isDesktop}
                  onExpand={onExpand}
                  content={catalog.title}
                />
              </div>
              <div className="footer-grid__list">
                {kitchenFilter?.form.length > 0 &&
                  kitchenFilter.form.map((item) => (
                    <div
                      className="footer-grid__sublink"
                      onClick={() => linkTo(PATH.KITCHENS, { form: item.slug })}
                      key={item.name}
                    >
                      <FooterSublink content={item.name} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="footer__column">
            {/* {materialCategories?.length > 0 && (
              <div className="footer__item footer-grid footer-grid--catalog">
                <div
                  onClick={() => linkTo(PATH.MATERIALS)}
                  className="footer-grid__link"
                >
                  <FooterLink
                    withIcon={!isDesktop}
                    onExpand={onExpand}
                    content={materials.title}
                  />
                </div>
                <div className="footer-grid__list">
                  {materialCategories.map((item) => (
                    <div
                      key={item.name}
                      className="footer-grid__sublink"
                      onClick={() =>
                        linkTo(PATH.MATERIALS, { group: item.slug })
                      }
                    >
                      <FooterSublink content={item.name} />
                    </div>
                  ))}
                </div>
              </div>
            )} */}
            {technicsCategories?.length > 0 && (
              <div className="footer__item footer-grid footer-grid--catalog">
                <div
                  className="footer-grid__link"
                  onClick={() => linkTo(PATH.TECHNICS)}
                >
                  <FooterLink
                    withIcon={!isDesktop}
                    onExpand={onExpand}
                    content={technique.title}
                  />
                </div>
                <div className="footer-grid__list">
                  {technicsCategories.map((item) => (
                    <div
                      key={item.name}
                      onClick={() =>
                        linkTo(PATH.TECHNICS, { group: item.slug })
                      }
                      className="footer-grid__sublink"
                    >
                      <FooterSublink content={item.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {sinksCategories?.length > 0 && (
              <div className="footer__item footer-grid footer-grid--catalog">
                <div
                  onClick={() => linkTo(PATH.SINKS)}
                  className="footer-grid__link"
                >
                  <FooterLink
                    withIcon={!isDesktop}
                    onExpand={onExpand}
                    content={mixers.title}
                  />
                </div>
                <div className="footer-grid__list">
                  {sinksCategories.map((item) => (
                    <div
                      onClick={() => {
                        linkTo(PATH.SINKS, { group: item.slug })
                      }}
                      key={item.name}
                      className="footer-grid__sublink"
                    >
                      <FooterSublink content={item.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="footer__column">
            <div className="footer__item footer-grid footer-grid--catalog">
              <RouterLink href={buyer.slug} parentSelector="footer-grid__link">
                <FooterLink
                  withIcon={!isDesktop}
                  onExpand={onExpand}
                  content={buyer.title}
                />
              </RouterLink>
              <div className="footer-grid__list">
                {buyer.sublist.map((item) => (
                  <RouterLink
                    href={item.slug}
                    key={item.name}
                    parentSelector="footer-grid__sublink"
                  >
                    <FooterSublink content={item.name} />
                  </RouterLink>
                ))}
              </div>
            </div>
            <div className="footer__item footer-grid footer-grid--catalog">
              <RouterLink
                href={process.slug}
                parentSelector="footer-grid__link"
              >
                <FooterLink
                  withIcon={!isDesktop}
                  onExpand={onExpand}
                  content={process.title}
                />
              </RouterLink>
              <div className="footer-grid__list">
                {process.sublist.map((item) => (
                  <RouterLink
                    href={item.slug}
                    key={item.name}
                    parentSelector="footer-grid__sublink"
                  >
                    <FooterSublink content={item.name} />
                  </RouterLink>
                ))}
              </div>
            </div>
            {/* <div className="footer__item footer-grid footer-grid--catalog">
              <RouterLink
                href={payment.slug}
                parentSelector="footer-grid__link"
              >
                <FooterLink
                  withIcon={!isDesktop}
                  onExpand={onExpand}
                  content={payment.title}
                />
              </RouterLink>
              <div className="footer-grid__list">
                {payment.sublist.map((item) => (
                  <RouterLink
                    href={item.slug}
                    key={item.name}
                    parentSelector="footer-grid__sublink"
                  >
                    <FooterSublink content={item.name} />
                  </RouterLink>
                ))}
              </div>
            </div> */}
          </div>
          <div className="footer__column">
            <div className="footer__item footer-grid footer-grid--catalog">
              <RouterLink href={about.slug} parentSelector="footer-grid__link">
                <FooterLink
                  withIcon={!isDesktop}
                  onExpand={onExpand}
                  content={about.title}
                />
              </RouterLink>
              <div className="footer-grid__list">
                {about.sublist.map((item) => (
                  <RouterLink
                    href={item.slug}
                    key={item.name}
                    parentSelector="footer-grid__sublink"
                  >
                    <FooterSublink content={item.name} />
                  </RouterLink>
                ))}
              </div>
            </div>
          </div>
          <div className="footer__column footer__column--contacts">
            <div className="footer__item footer-grid footer-grid--contacts footer-grid--choice">
              <p className="footer-grid__description">{order.title}</p>
              <a
                className="footer-grid__phone"
                href={`tel:${phone && phone.replace(/[\ \+\(\)\-]+/gi, '')}`}
              >
                {phone}
              </a>
              <p className="footer-grid__caption">{order.caption}</p>
            </div>
            {/* <div className="footer__item footer-grid footer-grid--contacts footer-grid--guarantee">
              <p className="footer-grid__description">{guarantee.title}</p>
              <a className="footer-grid__phone" href={`tel:${guarantee.link}`}>
                {guarantee.number}
              </a>
              <p className="footer-grid__caption">{guarantee.caption}</p>
            </div> */}
            <div className="footer__item footer-grid footer-grid--contacts footer-grid--call">
              <HeaderForm
                toast={toast}
                setToast={setToast}
                parentSelector="footer-grid__button header-form--footer"
                content={binding.title}
              />
              <p className="footer-grid__caption">{binding.caption}</p>
            </div>
            {isDesktop && (
              <>
                <div className="footer__item footer-grid footer-grid--contacts">
                  <p className="footer-grid__phone">{delivery.title}</p>
                  <p className="footer-grid__caption">{delivery.caption}</p>
                </div>
                {/* <div className="footer__item footer-grid footer-grid--contacts">
                  <p className="footer-grid__description">{social.title}</p>
                  <div className="footer-grid__icons">
                    {social.list.map((item, index) => (
                      <a
                        key={index}
                        className="footer-grid__icon footer-grid__icon--svg"
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="social"
                      >
                        {item.icon === 'vk' && <VkIcon />}
                        {item.icon === 'inst' && <InstIcon />}
                      </a>
                    ))}
                  </div>
                </div> */}
                <div className="footer__item footer-grid footer-grid--contacts">
                  <p className="footer-grid__description">{payments.title}</p>
                  <div className="footer-grid__icons">
                    {payments.list.map((item, index) => (
                      <div key={index} className="footer-grid__icon">
                        <Image src={item.icon} alt={item.name} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          {!isDesktop && (
            <>
              <div className="footer__column footer__column--social">
                <div className="footer__item footer-grid footer-grid--contacts">
                  <p className="footer-grid__description">{social.title}</p>
                  <div className="footer-grid__icons">
                    {social.list.map((item, index) => (
                      <a
                        key={index}
                        className="footer-grid__icon footer-grid__icon--svg"
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="social"
                      >
                        {item.icon === 'vk' && <VkIcon />}
                        {item.icon === 'inst' && <InstIcon />}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="footer__item footer-grid footer-grid--contacts">
                  <p className="footer-grid__description">{payments.title}</p>
                  <div className="footer-grid__icons">
                    {payments.list.map((item, index) => (
                      <div key={index} className="footer-grid__icon">
                        <Image src={item.icon} alt={item.name} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="footer__column footer__column--links">
                {links.map((item, index) => (
                  <a
                    key={index}
                    className="footer-basement__link"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.text}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="footer__basement footer-basement container">
          <div className="footer-basement__row">
            <div className="footer-basement__item-logo">
              <RouterLink href="/" ariaLabel="heime">
                <IconLogo />
              </RouterLink>
              <p className="footer-basement__copyright">{logo.text}</p>
            </div>
          </div>
          {isDesktop && (
            <div className="footer-basement__row footer-basement__row--all">
              {links.map((item, index) => (
                <a
                  key={index}
                  className="footer-basement__link"
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.text}
                </a>
              ))}
            </div>
          )}
          {/* <div className="footer-basement__row">
            <a
              className="footer-basement__item-nimax"
              href={nimax.link}
              target="_blank"
              rel="noreferrer"
            >
              {nimax.text}
              <IconNimax />
            </a>
          </div> */}
        </div>
      </footer>
    </>
  )
}

export default Footer

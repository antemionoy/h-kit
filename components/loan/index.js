import { H1, Image } from 'elements'
import React from 'react'

const Loan = ({ data }) => {
  const { content, title, subtitle, banks } = data
  const [promo, conditions] = content
  return (
    <div className="container loan">
      <H1 content={title} parentSelector="loan__title" />
      <div className="p loan__subtitle">{subtitle}</div>

      <div className="loan__content">
        <div className="loan__content-item">
          <div className="loan__content-title h3">{promo.title}</div>
          <div className="loan__content-text">
            <div className="loan__content-icons">
              <div className="card-credit">
                <div className="card-credit__icon">
                  <p className="card-credit__title">{promo.percent.value}</p>
                  <p className="card-credit__caption">%</p>
                </div>
                <div className="p card-credit__description loan-card__description">
                  {promo.percent.text}
                </div>
              </div>
              <div className="card-credit">
                <div className="card-credit__icon card-credit--down">
                  <p className="card-credit__title">{promo.limit.title}</p>
                  <p className="card-credit__caption">{promo.limit.caption}</p>
                </div>
                <div className="p card-credit__description loan-card__description  loan-card__limit">
                  {promo.limit.text}
                </div>
              </div>
            </div>
            <div className="loan__content-descr">
              {content[0].text.split('\n').map((item, i) => (
                <p className="p loan__content-descr-item" key={i}>
                  {item || ' '}
                </p>
              ))}
              <ul className="loan__content-reasons">
                {content[0].reasons.map((item, i) => (
                  <li className="loan__content-reasons-item" key={i}>
                    <span className="list-marker" /> {item}
                  </li>
                ))}
              </ul>
              {content[0].text2?.split('\n').map((item, i) => (
                <p className="p loan__content-descr-item" key={i}>
                  {item || ' '}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="loan__content-item loan__conditions">
          <div className="loan__content-title h3">
            {conditions.title}
            <span>{conditions.title_highlighted}</span>
          </div>
          <div className="loan__content-text">
            <div className="loan__conditions-data">
              {conditions.data.map((item, i) => (
                <div className="requisites__item" key={i}>
                  <div className="requisites__item-title p">{item.title}</div>
                  <div className="requisites__item-value p">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="loan__content-item">
          <div className="loan__content-title h3" />
          <div className="loan__content-text">
            <div className="loan__content-descr">
              {content[2].text.split('\n').map((item, i) => (
                <p className="p loan__content-descr-item" key={i}>
                  {item || ' '}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="loan__banks">
          <div className="loan__banks-title h2">{banks.title}</div>

          <div className="loan__banks-data">
            {banks.data.map((bank, i) => (
              <div className="loan__bank" key={i}>
                <Image  src={bank.normal} srcSet={bank.normal} alt={bank.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loan

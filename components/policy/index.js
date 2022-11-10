import policyStatic from 'config/static/policy'
import { H1, H3 } from 'elements'
import React from 'react'
const Policy = () => {
  return (
    <div className="policy container">
      <H1 content={policyStatic.title} parentSelector="policy__title" />

      <div className="policy__list numeric-list">
        {policyStatic.list.map((item, i) => (
          <div className="numeric-list__item policy__list-item" key={i}>
            <H3 content={item.title} parentSelector="policy__list-title" />
            <div className="numeric-list policy__sublist">
              <div className="p policy__list-text">{item.text}</div>
              {item?.list.map((item, i) => (
                <div
                  key={i}
                  className="numeric-list__item policy__sublist-item p"
                >
                  <div className="p policy__sublist-text">{item}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="policy__specials">
        <H3
          content={policyStatic.specials.title}
          parentSelector="policy__specials-title"
        />
        <p className="p">{policyStatic.specials.text}</p>
      </div>
    </div>
  )
}

export default Policy

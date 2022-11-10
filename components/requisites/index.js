import staticRequisites from 'config/static/requisites'
import { H1, H3 } from 'elements'
import React from 'react'

const Requisites = ({ data }) => {
  return (
    <div className="requisites container">
      <H1 content={staticRequisites.title} parentSelector="requisites__title" />
      <H3
        content={staticRequisites.subtitle}
        parentSelector="requisites__subtitle"
      />
      <div className="requisites__data">
        {data.map((item, i) => (
          <div className="requisites__item" key={i}>
            <div className="requisites__item-title p">{item.key}</div>
            <div className="requisites__item-value p">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Requisites

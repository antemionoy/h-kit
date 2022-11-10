import { useQuery } from '@apollo/client'
import cx from 'classnames'
import { CardSpecial, HeaderBar , Image } from 'elements'
import { memoObj } from 'helpers'
import { memo } from 'react'
import SPECIAL_OFFERS_QUERY from 'graphql/queries/special_offers.graphql'
import { PATH } from 'config/path'
// import './stocks.scss'

function HeaderStocks({
  parentSelector,
  list,
  buttonText,
  title,
  slug,
  onMouseLeave = () => {},
}) {
  const { data: specialsData } = useQuery(SPECIAL_OFFERS_QUERY, {
    variables: { is_home: true },
  })
  return (
    <div
      className={cx('header-item-stocks', {
        [`${parentSelector}`]: parentSelector,
      })}
      onMouseLeave={onMouseLeave}
    >
      <HeaderBar
        buttonText={buttonText}
        title={title}
        slug={slug}
        onClick={onMouseLeave}
      />
      <div className="header-item-stocks__wrapper">
        {specialsData?.special_offers.data.length > 0 &&
          specialsData?.special_offers.data.map((item, index) => (
            <CardSpecial
              key={item.id}
              note={item.label}
              title={item.title}
              description={item.description}
              src={item.image.path}
              href={`${PATH.SPECIALS}/${item.slug}`}
              parentSelector="header-item-stocks__card"
            />
          ))}
      </div>
    </div>
  )
}
function equalFunc() {
  return memoObj.alwaysSkipRender()
}
export default memo(HeaderStocks)

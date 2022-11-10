import { CardCredit, H2, PairButton } from 'elements'
// import './credit.scss'

function Credit({ data }) {
  const { title, list, buttonText, slug } = data
  return (
    <div className="main__credit credit container">
      <div className="credit__wrapper">
        <H2 content={title} parentSelector="credit__title" />
        <div className="credit__list">
          {list.map((item, index) => (
            <CardCredit
              key={index}
              description={item.description}
              title={item.title}
              caption={item.caption}
              isDown={item.isDown}
              parentSelector="credit__item"
            />
          ))}
        </div>
        <PairButton
          content={buttonText}
          parentSelector="credit__button"
          href={slug}
        />
      </div>
    </div>
  )
}

export default Credit

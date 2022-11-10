import { FilterGrid, Order } from 'containers'
import { H1, Tags } from 'elements'

function Specials({
  title,
  description,
  offers,
  tags,
  specialsData,
  fetchMore,
  totalLenght,
}) {
  return (
    <div className="main-wrapper specials">
      <div className="container">
        <H1 content={title} parentSelector="main-wrapper__h1" />
        <p className="p specials__text">{description}</p>
        <Tags tags={tags} />
        <div className="specials__list special-offer special-offer-wrapper">
          <FilterGrid
            output={specialsData}
            totalLenght={totalLenght}
            blocks={offers}
            isSpecials="true"
            num={4}
            fetchMore={fetchMore}
          />
        </div>
        <Order parentSelector="specials__order" />
      </div>
    </div>
  )
}

export default Specials

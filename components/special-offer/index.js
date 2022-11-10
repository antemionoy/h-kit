import { PATH } from 'config/path'
import { CardSpecial, H2, PairButton } from 'elements'
import { useSelector } from 'react-redux'

function SpecialOffer({ title, buttonText, specialsData }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  return (
    <div className="main__special-offer special-offer">
      <H2 content={title} parentSelector="special-offer__title" />
      <div className="special-offer-wrapper">
        {specialsData.map((item) => (
          <CardSpecial
            key={item.id}
            note={item.label}
            title={item.title}
            description={item.description}
            src={item.image.path}
            href={`${PATH.SPECIALS}/${item.slug}`}
            parentSelector="special-offer__card"
            isMobile={isMobile}
          />
        ))}
      </div>
      <PairButton content={buttonText} href={PATH.SPECIALS} />
    </div>
  )
}

export default SpecialOffer

import { CardDouble, CardPerson, H2 } from 'elements'

function AboutProduction({ data }) {
  const {
    title,
    src,
    cardSrc,
    description,
    buttonText,
    href,
    note,
    card,
  } = data
  return (
    <div className="about-production">
      <H2 content={title} parentSelector="about-production__title" />
      <CardDouble
        parentSelector="about-production__content"
        src={src}
        cardSrc={cardSrc}
        description={description}
        buttonText={buttonText}
        href={href}
      />
      <div className="about-production__note">
        <H2 content={note} parentSelector="about-production__note-title" />
        <CardPerson
          parentSelector="about-production__person"
          title={card.title}
          description={card.description}
          src={card.src}
        />
      </div>
    </div>
  )
}

export default AboutProduction

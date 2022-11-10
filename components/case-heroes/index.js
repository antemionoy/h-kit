import { CardDouble, H2 } from 'elements'

function CaseHeroes({ title, text, leftImage, rightImage }) {
  return (
    <div className="case-heroes">
      <H2 content={title} parentSelector="case-heroes__title" />
      <CardDouble
        src={rightImage.path}
        cardSrc={leftImage.path}
        description={text}
        isReverse
      />
    </div>
  )
}

export default CaseHeroes

import { PATH } from 'config/path'
import { CardSpecial, Image, PairButton } from 'elements'

function Offer({
  backButtonText,
  title,
  image,
  text,
  conditionsTitle,
  conditions,
  buttonText,
  buttonLink,
  relatedTitle,
  related,
}) {
  return (
    <div className="main-wrapper main-wrapper--sm-top offer container">
      <PairButton isBack="true" href={PATH.SPECIALS} content={backButtonText} />
      <h1 className="h2 main-wrapper__h1">{title}</h1>
      <div className="grid grid--gap-80">
        {image && (
          <div className="grid__col grid__col--md">
            <Image 
              src={image.normal}
              srcSet={`${image.normal} 1x, ${image.retina} 2x`}
              alt={title}
            />
          </div>
        )}
        <div className="grid__col grid__col--md">
          <p className="p">{text}</p>
          {conditions && (
            <>
              <h2 className="h4 main-wrapper__h3">{conditionsTitle}</h2>
              <p className="p">{conditions}</p>
            </>
          )}
          {buttonText && buttonLink && (
            <PairButton
              content={buttonText}
              href={buttonLink === '#' ? '' : buttonLink}
              parentSelector="offer__button"
            />
          )}
        </div>
      </div>
      {related?.length > 0 && (
        <>
          <h2 className="h2 offer__h2">{relatedTitle}</h2>
          <div className="offer__list special-offer special-offer-wrapper">
            {related.map((item) => (
              <CardSpecial
                key={item.id}
                note={item.label}
                title={item.title}
                description={item.description}
                src={item.image.path}
                href={item.slug}
                parentSelector="special-offer__card"
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Offer

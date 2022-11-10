import cx from 'classnames'
import { H2, Image, P } from 'elements'

function AboutProvider({ parentSelector, title, description, list }) {
  return (
    <div
      className={cx('about-provider', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      <div className="about-provider__content container">
        <H2 parentSelector="about-provider__title" content={title} />
        <P parentSelector="about-provider__description" content={description} />
      </div>
      <div className="about-provider__list container">
        {list.map((item) => (
          <div className="about-provider__item" key={item.id}>
            <Image 
              src={item.image.path.normal}
              srcSet={`${item.image.path.normal} 1x, ${item.image.path.retina} 2x`}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutProvider

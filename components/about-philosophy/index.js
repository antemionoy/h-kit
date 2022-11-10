import { H2, Image, P } from 'elements'

function AboutPhilosophy({ data }) {
  const { images = [], title, description, list = [] } = data
  return (
    <div className="about-philosophy">
      <div className="about-philosophy__images">
        {images.map((item, index) => (
          <Image  key={index} src={item.src} alt="" />
        ))}
      </div>
      <div className="about-philosophy__content">
        <div className="about-philosophy__item">
          <H2 parentSelector="about-philosophy__title" content={title} />
          <P
            parentSelector="about-philosophy__description"
            content={description}
          />
        </div>
        <div className="about-philosophy__item">
          {list.map((item, index) => (
            <div className="about-philosophy__block" key={index}>
              <h3 className="h4 about-philosophy__subtitle">{item.title}</h3>
              <P
                parentSelector="about-philosophy__subdescription"
                content={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutPhilosophy

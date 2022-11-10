import { CardSmi, H2 } from 'elements'
import Swiper from 'react-id-swiper'
import { useSelector } from 'react-redux'

function AboutSmi({ title, list }) {
  const isMobile = useSelector((state) => state.breakpoint.isMobile)
  const swiperParams = {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  }

  return (
    <div className="about-smi">
      <H2 content={title} parentSelector="about-smi__title" />
      <div className="about-smi__list">
        {isMobile && (
          <Swiper {...swiperParams}>
            {list.map((item) => (
              <div className="about-smi__list-wrapper" key={item.id}>
                <CardSmi
                  parentSelector="about-smi__list-item"
                  preview={item.preview}
                  source={item.source}
                  sourceLogo={item.source_logo}
                  date={item.date}
                  title={item.title}
                  link={item.link}
                />
              </div>
            ))}
          </Swiper>
        )}
        {!isMobile &&
          list.map((item) => (
            <CardSmi
              key={item.id}
              parentSelector="about-smi__list-item"
              preview={item.preview}
              source={item.source}
              sourceLogo={item.source_logo}
              date={item.date}
              title={item.title}
              link={item.link}
            />
          ))}
      </div>
    </div>
  )
}

export default AboutSmi

import { DescriptionList, H1, PairButton } from 'elements'

function Delivery(props) {
  const { data, deliveryData } = props
  const { title, text, img, workHours, prices, h2, workInfo } = data

  return (
    <div className="main-wrapper delivery container">
      <H1 content={title} parentSelector="main-wrapper__h1" />
      <div className="grid">
        <div className="grid__col grid__col--lg">
          <p className="p">{text}</p>
        </div>
        <div className="grid__col grid__col--xs grid__col--end info-item info-item--reverse">
          <p className="h3 info-item__info">{workHours.hours}</p>
          <p className="h5 info-item__title">{workHours.exp}</p>
        </div>
      </div>
      <div className="grid delivery__prices">
        <div className="grid__col grid__col--md">
          <img
            width={img.width}
            height={img.height}
            src={img.src}
            alt={img.alt}
          />
        </div>
        <div className="grid__col grid__col--md">
          <DescriptionList isTable="true" list={deliveryData} />
        </div>
      </div>
      <h2 className="h2 delivery__h2">{h2}</h2>
      <div className="grid">
        <div className="grid__col grid__col--md">
          <p className="p">{workInfo.text}</p>
          <PairButton
            content={workInfo.button.buttonText}
            href={workInfo.button.slug}
            parentSelector="delivery__button"
          />
          <img
            width={workInfo.img.width}
            height={workInfo.img.height}
            src={workInfo.img.src}
            alt={workInfo.img.alt}
          />
        </div>
        <div className="grid__col grid__col--md">
          <DescriptionList list={workInfo.list} />
        </div>
      </div>
    </div>
  )
}

export default Delivery

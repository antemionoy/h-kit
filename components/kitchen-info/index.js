import { CardDescription, CardPerson, H4, P } from 'elements'
import { getCategoryPath } from 'helpers'
import Icon from 'public/icons/info-ok-icon.svg'

function KitchenInfo({ designer, materials, features }) {
  return (
    <div className="kitchen__info kitchen-info">
      {designer && (
        <div className="kitchen-info__row">
          <H4 content="Дизайнер" parentSelector="kitchen-info__subtitle" />
          <CardPerson
            parentSelector="kitchen-info__designer"
            title={designer.name}
            description={designer.description}
            src={designer.image.path}
          />
        </div>
      )}
      {materials && materials.length > 0 && (
        <div className="kitchen-info__row">
          <H4 content="Материалы" parentSelector="kitchen-info__subtitle" />
          <div className="kitchen-info__materials">
            {materials &&
              materials.map(
                (item) =>
                  item.material && (
                    <CardDescription
                      key={item.material.id}
                      title={item.material.title}
                      src={item.image.path}
                      parentSelector="kitchen-info__material"
                      href={`${getCategoryPath(
                        item.material.category.slug,
                        item.material.type
                      )}/${item.material.slug}`}
                    />
                  )
              )}
          </div>
        </div>
      )}
      {features && features.length > 0 && (
        <div className="kitchen-info__row">
          <H4
            content="Что входит в стоимость"
            parentSelector="kitchen-info__subtitle"
          />
          <div className="kitchen-info__pluses">
            {features.map((item, index) => (
              <div
                className="kitchen-info__plus"
                key={`features-info${index + 1}`}
              >
                <Icon />
                <P
                  key={`features${index + 1}`}
                  content={item}
                  parentSelector="kitchen-info__plus-text"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default KitchenInfo

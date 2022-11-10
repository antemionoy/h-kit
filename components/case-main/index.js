import { PATH } from 'config/path'
import { CASES_ABOUT_DICTIONARY } from 'config/static/case'
import { CardDescription, H2, H4, H5, Image, P, PairButton } from 'elements'

function CaseMain({
  title,
  description,
  tags = [],
  src,
  subtitle,
  list,
  back,
}) {
  return (
    <div className="case-main">
      {back && (
        <PairButton
          isBack={true}
          content={back.content}
          parentSelector="product-main__back"
          onClick={back.onClick}
        />
      )}
      <h1 className="case-main__title h1">{title}</h1>
      <div className="case-main__header">
        <P content={description} parentSelector="case-main__description" />
        <div className="case-main__tags">
          {tags.map((item) => (
            <CardDescription
              key={item.id}
              title={item.name}
              parentSelector="case-main__tag"
              href={`${PATH.KITCHENS}/?tags=${item.slug}`}
            />
          ))}
        </div>
      </div>
      {src && (
        <Image
          className="case-main__image"
          src={src.normal}
          srcSet={`${src.normal} 1x, ${src.retina} 2x`}
          alt={title}
        />
      )}
      {list && Object.keys(list).length > 0 && (
        <div className="case-main__info">
          <H2 parentSelector="case-main__subtitle" content={subtitle} />
          <div className="case-main__list">
            {Object.keys(list).map((key) => {
              if (key.includes('__')) return null
              if (!list[key] || list[key] === '???') return null
              return (
                <div className="case-main__list-item" key={key}>
                  <H5
                    parentSelector="case-main__list-caption"
                    content={CASES_ABOUT_DICTIONARY[key]}
                  />
                  <H4
                    parentSelector="case-main__list-title"
                    content={list[key]}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default CaseMain

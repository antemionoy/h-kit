import { CardCase } from 'elements'

function CatalogCases({ case1, case2, title, description, buttonText, slug }) {
  return (
    <div className="catalog-cases">
      <CardCase
        title={title}
        description={description}
        imageMain={case1}
        imageCommon={case2}
        buttonText={buttonText}
        href={slug}
        parentSelector="catalog-cases__item"
        isRevetse
      />
    </div>
  )
}

export default CatalogCases

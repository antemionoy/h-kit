import { CardProductSlider } from 'components'
import { PATH } from 'config/path'
import { Gallery, Image, PairButton } from 'elements'
import { ProductGrid } from '../../containers'

function Article({
  backButtonText,
  title,
  description,
  relatedTitle,
  related,
  list,
  productSliderTitle,
}) {
  return (
    <div className="main-wrapper main-wrapper--sm-top article container">
      <PairButton isBack="true" href={PATH.IDEAS} content={backButtonText} />
      <h1 className="h2 main-wrapper__h1 article__h1">{title}</h1>
      <p className="p article__text">{description}</p>
      {list && list.length > 0 && (
        <ol className="numeric-list numeric-list--green numeric-list--inside numeric-list--page">
          {list.map((item) => {
            if (item.type === 'odd') {
              return (
                <li className="numeric-list__item" key={item.id}>
                  <div className="numeric-list__header">
                    <h2 className="h3 numeric-list__title">{item.title}</h2>
                    {item.head && <p className="p">{item.head}</p>}
                  </div>
                  {item.material_image && (
                    <Gallery list={item.material_image} />
                  )}
                  {/* {item.materials.length > 0 && (
                    <CardProductSlider
                      title={productSliderTitle}
                      list={item.materials}
                      parentSelector="article__items"
                    />
                  )} */}
                  {item.text && <p className="p article__p">{item.text}</p>}
                  {item.gallery && <Gallery list={item.gallery} />}
                </li>
              )
            }
            if (item.type === 'even') {
              return (
                <li className="numeric-list__item" key={item.id}>
                  <div className="numeric-list__header">
                    <p className="p">{item.head}</p>
                  </div>
                  {item.gallery && <Gallery list={item.gallery} />}
                  <div className="grid article__grid">
                    {item.content_block.image && (
                      <div className="grid__col grid__col--md">
                        <Image
                          src={item.content_block.image.path.normal}
                          srcSet={`${item.content_block.image.path.normal} 1x, ${item.content_block.image.path.retina} 2x`}
                          alt={item.content_block.title}
                        />
                      </div>
                    )}
                    <div className="grid__col grid__col--md grid__col--center text-block">
                      <h3 className="h3">{item.content_block.title}</h3>
                      <p className="p">{item.content_block.text}</p>
                    </div>
                  </div>
                </li>
              )
            }
            return null
          })}
        </ol>
      )}

      {related && related.length > 0 && (
        <>
          <h2 className="h2 main-wrapper__h2 article__h2">{relatedTitle}</h2>
          <ProductGrid
            parentSelector="product-grid--4 article__advice"
            output={related}
            slugPath={PATH.IDEAS}
            isAdvice
            hideMore
          />
        </>
      )}
    </div>
  )
}

export default Article

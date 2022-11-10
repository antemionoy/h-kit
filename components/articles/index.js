import { PATH } from 'config/path'
import { ProductGrid } from 'containers'
import { CardPerson, H1, H2, Tags } from 'elements'
import { Ideas } from '../index'

const chunkArray = (array = [], chunkSize = 1) => {
  return [].concat.apply(
    [],
    array.map(function (elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)]
    })
  )
}

const getArticles = (ideas = [], cases = [], one = false) => {
  let restArticles = []
  const mainArticles = ideas.slice(0, 3)
  const restIdeas = ideas.slice(3, ideas.length)
  if (one) {
    return [mainArticles, restIdeas]
  }
  const casesArrays = chunkArray(cases, 4)
  const ideasArrays = chunkArray(restIdeas, 4)
  const maxIndex = Math.max(casesArrays.length, ideasArrays.length)
  for (let i = 0; i < maxIndex; i++) {
    if (casesArrays[i]) {
      restArticles = [...restArticles, ...casesArrays[i]]
    }
    if (ideasArrays[i]) {
      restArticles = [...restArticles, ...ideasArrays[i]]
    }
  }
  return [mainArticles, restArticles]
}

function Articles({
  title,
  description,
  quote,
  ideasTagsData,
  ideasData,
  // ideasDataThree,
  // ideasDataRest,
  casesData,
  isCases,
  fetchMore = () => {},
  both,
}) {
  const cases = casesData?.data?.map((item, i) => ({
    id: `${PATH.CASES}/${item.slug}`,
    slug: `${PATH.CASES}/${item.slug}`,
    description: item.overview.description,
    label: 'Кейс',
    image: item.detail_image,
    title: item.title,
  }))
  const transfromIdeas = (item) => ({
    ...item,
    slug: `${PATH.IDEAS}/${item.slug}`,
  })
  const [mainArticles, restArticles] = !both
    ? isCases
      ? getArticles(cases, undefined, true)
      : getArticles(ideasData?.data.map(transfromIdeas), undefined, true)
    : getArticles(ideasData?.data.map(transfromIdeas), cases)
  return (
    <div className="main-wrapper specials articles">
      <div className="container">
        <H1 content={title} parentSelector="main-wrapper__h1" />
        <p className="p specials__text">{description}</p>
        {ideasTagsData && (
          <Tags
            tags={[{ id: 0, slug: 'cases', name: 'Кейсы' }, ...ideasTagsData]}
            oneActive={true}
            toggleOneActive={true}
          />
        )}
        <Ideas
          ideasData={mainArticles}
          parentSelector="articles__ideas"
          withBigCard
          bigCardSlug={false}
        />
        {quote && (
          <div className="quote articles__quote">
            <H2 content={quote.text} parentSelector="quote__text" />
            <CardPerson
              parentSelector="quote__person"
              title={quote.card.title}
              description={quote.card.description}
              src={quote.card.src}
            />
          </div>
        )}

        <ProductGrid
          parentSelector="product-grid--4"
          output={restArticles}
          totalLenght={
            both
              ? casesData?.pagination.total + ideasData?.pagination.total
              : isCases
              ? casesData?.pagination.total
              : ideasData?.pagination.total
          }
          offLoaded={3}
          fetchMore={fetchMore}
          isAdvice
        />
      </div>
    </div>
  )
}

export default Articles

import { CardDescription } from 'elements'

function Page404({ data, promoCode }) {
  const { title, text, text2, tags } = data
  return (
    <div className="main-wrapper page404 container">
      <h1 className="h2 main-wrapper__h1 page404__h1">{title}</h1>
      {promoCode && (
        <p className="p page404__text">{`${text} ${promoCode} ${text2}`}</p>
      )}
      {!promoCode && <p className="p page404__text">{`${text} ${text2}`}</p>}
      <ul className="tags-list page404__links">
        {tags.map((item) => (
          <li className="tags-list__item" key={item.id}>
            <CardDescription title={item.title} href={item.href} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page404

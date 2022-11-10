import cx from 'classnames'
import { Fragment, useState } from 'react'
import { Input } from '../../index'

function DescriptionList(props) {
  const { list, isTable, parentSelector } = props
  const [val, setVal] = useState(false)
  if (isTable) {
    return (
      <table
        className={cx('description-list', {
          [`${parentSelector}`]: parentSelector,
        })}
      >
        <tbody>
          {list.map((item) => (
            <Fragment key={item.id}>
              <tr className="h4 description-list__header">
                <td>{item.header || item.name}</td>
                <td className="description-list__col">
                  {item.col || item.price}
                </td>
              </tr>
              <tr className="p  description-list__text">
                <td colSpan={2}>
                  {item.text || item.description}
                  {item.input && (
                    <Input
                      value={val === false ? item.input.value : val}
                      placeholder={item.input.placeholder}
                      hasError={item.input.hasError}
                      errorText={item.input.errorText}
                      type={item.input.type}
                      name={item.input.name}
                      ariaLabel={item.input.name}
                      onChange={(e) => setVal(e.target.value)}
                    />
                  )}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    )
  }
  return (
    <dl
      className={cx('description-list', {
        [`${parentSelector}`]: parentSelector,
      })}
    >
      {list.map((item) => (
        <Fragment key={item.id}>
          <dt className="h4  description-list__header">
            {item.header || item.name}
          </dt>
          <dd className="p  description-list__text">
            {item.text || item.description}
          </dd>
        </Fragment>
      ))}
    </dl>
  )
}

export default DescriptionList

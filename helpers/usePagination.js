import { NetworkStatus } from '@apollo/client'
import { useRouter } from 'next/router'
import { catalogHelpers } from 'helpers'
const { deleteCategoryFromQuery } = catalogHelpers

export const usePagination = ({ pathname, networkStatus }) => {
  const router = useRouter()
  const fetchMore = () => {
    if (!(networkStatus === NetworkStatus.setVariables)) {
      let query = deleteCategoryFromQuery(router.query, [
        'param',
        'group',
        'tag',
      ])

      if (query.page && !isNaN(query.page)) {
        query.page = +query.page + 1
      } else {
        query.page = 2
      }
      router.push({ query, pathname }, undefined, {
        shallow: true,
      })
    }
  }

  return { fetchMore }
}

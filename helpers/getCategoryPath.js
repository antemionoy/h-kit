import {
  MATERIALS_PRODUCTS_PATH,
  CATEGORY_PRODUCTS_PATH,
  PATH,
} from 'config/path'

export default function getCategoryPath(categorySlug, type) {
  let path = CATEGORY_PRODUCTS_PATH[type]
  if (!path) {
    path = MATERIALS_PRODUCTS_PATH[categorySlug]
  }
  if (path) return path
  return ''
}

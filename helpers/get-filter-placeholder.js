import { FILTERS_DICTIONARY } from 'config/static/catalog_kitchens'

export default function getFilterPlaceholder(name) {
  return FILTERS_DICTIONARY[name]
}

const NOT_CHOSEN_ONE = 'Не выбрано'

const catalogHelpers = {
  generateNewGroup(arr, groupSlug, slug, alreadyHas) {
    try {
      if (Array.isArray(arr[groupSlug])) {
        if (alreadyHas) {
          return arr[groupSlug].filter((item) => item !== slug)
        }
        return [...arr[groupSlug], slug].filter((i) => i && i.length > 0)
      }
      if (alreadyHas) {
        return [arr[groupSlug], slug].filter((i) => i !== slug)
      }
      return [arr[groupSlug], slug].filter((i) => i && i.length > 0)
    } catch (e) {
      return null
    }
  },
  checkTagActive(arr, slug) {
    try {
      if (Array.isArray(arr)) {
        return arr.includes(slug)
      }
      return arr === slug
    } catch (e) {
      return false
    }
  },
  generateNewTags(arr, slug, alreadyHas) {
    try {
      if (Array.isArray(arr)) {
        if (alreadyHas) {
          return arr.filter((item) => item !== slug)
        }
        return [...arr, slug].filter((i) => i && i.length > 0)
      }
      if (alreadyHas) {
        return [slug].filter((i) => i !== slug)
      }
      return [arr, slug].filter((i) => i && i.length > 0)
    } catch (e) {
      return null
    }
  },
  getActiveSort(arr, chosenOne) {
    try {
      return arr.find((i) => i.slug === chosenOne).name || NOT_CHOSEN_ONE
    } catch (e) {
      return NOT_CHOSEN_ONE
    }
  },
  getSelectorArr(arr, type) {
    try {
      if (Array.isArray(arr[type])) {
        return arr[type].filter((i) => i && i.length > 0)
      }
      if (typeof arr[type] === 'string') {
        return [arr[type]].filter((i) => i && i.length > 0)
      }
      return []
    } catch (e) {
      return []
    }
  },

  deleteCategoryFromQuery(obj, slug) {
    const query = { ...obj }
    if (Array.isArray(slug)) {
      delete query.min
      delete query.max
      for (const delSlug of slug) {
        delete query[delSlug]
      }
    } else {
      delete query[slug]
    }
    return query
  },
}

export default catalogHelpers

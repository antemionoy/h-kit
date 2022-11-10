const componentsMemo = {
  byValue(prev, next) {
    return prev.value === next.value
  },
  byActiveValue(prev, next) {
    return prev.activeValue === next.activeValue
  },
  byErrorStatus(prev, next) {
    return prev.hasError === next.hasError
  },
  byParentSelector(prev, next) {
    return prev.parentSelector === next.parentSelector
  },
  byDisabled(prev, next) {
    return prev.isDisabled === next.isDisabled
  },
  byActive(prev, next) {
    return prev.isActive === next.isActive
  },
  byLoading(prev, next) {
    return prev.isLoading === next.isLoading
  },
  byActiveCity(prev, next) {
    return prev.activeCity === next.activeCity
  },
  byContent(prev, next) {
    return prev.content === next.content
  },
  byKey(prev, next, key) {
    try {
      return prev[key] === next[key]
    } catch (e) {
      return true
    }
  },
  alwaysSkipRender() {
    return true
  },
}
export default componentsMemo

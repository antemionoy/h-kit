export function toggleFavorite(id, type) {
  if (typeof window !== 'undefined') {
    let favorite = []
    // Check if item exists in localstorage
    if (localStorage.getItem(`fav_${type}`)) {
      favorite = JSON.parse(localStorage.getItem(`fav_${type}`))
    }
    // Check if ID is aready in array, then remove
    if (favorite.includes(id)) {
      favorite = favorite.filter((item) => item !== id)
      localStorage.setItem(`fav_${type}`, JSON.stringify(favorite))
      return false
    }
    favorite.unshift(id) // Add ID to the list and set localstorage
    localStorage.setItem(`fav_${type}`, JSON.stringify(favorite))
    return true
  }
  return false
}

export function checkFavorite(id, type) {
  if (typeof window !== 'undefined') {
    let favorite = []
    // Check if item exists in localstorage
    if (localStorage.getItem(`fav_${type}`)) {
      favorite = JSON.parse(localStorage.getItem(`fav_${type}`))
    }
    // Check if ID is aready in array
    if (favorite.includes(id)) return true
    return false
  }
  return false
}

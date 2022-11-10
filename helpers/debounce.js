export default function debounce(f, ms) {
  let isCooldown = false

  return () => {
    if (isCooldown) return

    f.apply(this, arguments)

    isCooldown = true

    setTimeout(() => (isCooldown = false), ms)
  }
}

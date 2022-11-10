export default function formatNote(note) {
  const regex = /#(.*?)#/

  const result = note.replace(
    regex,
    '<span class="wide-slider__note--colored">$1</span>'
  )
  return result
}

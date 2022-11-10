const MIN_ROWS = 7
const MAX_ROWS = 30
const TEXTAREA_LH = 26

export default function textareaResize(event, setRows) {
  const previousRows = event.target.rows
  event.target.rows = MIN_ROWS

  const currentRows = ~~(event.target.scrollHeight / TEXTAREA_LH) - 1

  if (currentRows === previousRows) {
    event.target.rows = currentRows
  }
  if (currentRows >= MAX_ROWS) {
    event.target.rows = MAX_ROWS
    event.target.scrollTop = event.target.scrollHeight
  }
  setRows(currentRows < MAX_ROWS ? currentRows : MAX_ROWS)
}

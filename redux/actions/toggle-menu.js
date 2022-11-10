import * as types from 'redux/action-types'

export default function menuToggle(bool) {
  return {
    type: types.MENU_TOGGLE,
    payload: bool,
  }
}

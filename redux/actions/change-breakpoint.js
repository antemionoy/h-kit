import * as types from 'redux/action-types'

export default function changeBreakpoint(breakpoints) {
  return {
    type: types.CHANGE_BREAKPOINT,
    payload: breakpoints,
  }
}

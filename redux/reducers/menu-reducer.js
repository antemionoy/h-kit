import * as types from 'redux/action-types'

const initialState = {
  isOpen: false,
}

export default function BreakpointReducer(state = initialState, action) {
  switch (action.type) {
    case types.MENU_TOGGLE:
      return {
        ...state,
        isOpen: action.payload,
      }
    default:
      return state
  }
}

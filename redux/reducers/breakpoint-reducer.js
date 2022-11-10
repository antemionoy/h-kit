import * as types from 'redux/action-types'

const initialState = {
  isDesktop: true,
  isTablet: false,
  isMobile: false,
}

export default function BreakpointReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_BREAKPOINT:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}

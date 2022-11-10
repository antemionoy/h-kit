import * as types from 'redux/action-types'

const initialState = []

export default function ContactsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_CONTACTS:
      return [...action.payload]
    default:
      return state
  }
}

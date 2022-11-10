import * as types from 'redux/action-types'

export default function setContacts(contacts) {
  return {
    type: types.SET_CONTACTS,
    payload: contacts,
  }
}

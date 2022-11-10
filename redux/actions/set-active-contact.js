import * as types from 'redux/action-types'

export default function setActiveContact(contact) {
  return {
    type: types.SET_ACTIVE_CONTACT,
    payload: contact,
  }
}

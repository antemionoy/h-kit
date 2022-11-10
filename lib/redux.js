import { useMemo } from 'react'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import * as reducers from 'redux/reducers'

import { composeWithDevTools } from 'redux-devtools-extension'
const reducer = combineReducers(reducers)

function initStore(preloadedState = {}) {
  return createStore(
    reducer,
    preloadedState
    // composeWithDevTools(applyMiddleware())
  )
}

let store

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }
  if (typeof window === 'undefined') return _store
  if (!store) store = _store
  return _store
}

export function useStore(initialState) {
  let state = JSON.stringify(initialState)
  const store = useMemo(() => {
    return initializeStore(initialState)
  }, [state])
  return store
}

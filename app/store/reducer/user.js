import {
  SET_USER_INFO,
  SET_LOADING,
  FOCUS_REPO,
  LOGOUT,
  ADD,
  DEC
} from '../constants/user'

const initialGlobalState = {
  name: ''
  // focusedRepos: []
}

export const reducer = (state = initialGlobalState, action) => {
  // console.log('reducer init....')
  // console.log(action)
  switch (action.type) {
    case SET_USER_INFO:
      return Object.assign({}, state, {
        user: action.data
      })
    case FOCUS_REPO:
      return Object.assign({}, state, {
        focusedRepos: [state.focusedRepos, action.repo]
      })
    case LOGOUT:
      return Object.assign({}, state, {
        user: {}
      })
    case ADD:
      return Object.assign({}, state, {
        count: state.count + action.value
      })
    case DEC:
      return Object.assign({}, state, {
        count: state.count - action.value
      })
    default:
      return state
  }
}

import { combineReducers } from 'redux'

import { gitForksReducer } from 'features/gitForks'

export default combineReducers({
  gitForks: gitForksReducer,
})

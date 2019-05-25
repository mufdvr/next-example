import { combineEpics } from 'redux-observable'

import repos from './repos'
import forks from './forks'

export default combineEpics(
  repos,
  forks,
)
import { combineEpics } from 'redux-observable'

import { gitForksEpics } from 'features/gitForks'

export default combineEpics(gitForksEpics)

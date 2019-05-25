import * as gitForksContainers from './containers'
import gitForksReducer, { GitForksAction, IGitForksState } from './reducer'
import gitForksEpics from './epics'
import * as gitForksActions from './actions'

export {
  gitForksContainers,
  gitForksReducer,
  gitForksEpics,
  gitForksActions,
}
export type GitForksAction = GitForksAction
export type IGitForksState = IGitForksState

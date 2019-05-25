import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'

import * as actions from '../actions'
import forks, { IForksState } from './forks'
import repos, { IReposState } from './repos'

export type GitForksAction = ActionType<typeof actions>

export interface IGitForksState {
  readonly forks: IForksState
  readonly repos: IReposState
}

export default combineReducers<IGitForksState>({
  forks,
  repos
})
import { combineReducers } from 'redux'
import { getType } from 'typesafe-actions'

import { GitForksAction } from '.'
import { fetchRepos } from '../actions'

export interface IReposState {
  readonly repos: string[]
  readonly fetching: boolean
  readonly error: IRequestError
}

export default combineReducers<IReposState, GitForksAction>({
  repos: (state = [], action) =>
    action.type === getType(fetchRepos.success) ? action.payload : state,
  fetching: (state = false, action) =>
    action.type === getType(fetchRepos.request) || (state && !(getType(fetchRepos.success) || getType(fetchRepos.failure))),
  // tslint:disable-next-line: variable-name
  error: (_state, action) => (action.type === getType(fetchRepos.failure) ? action.payload : { message: '', status: 0 }),
})

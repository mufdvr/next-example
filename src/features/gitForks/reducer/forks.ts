import { combineReducers } from 'redux'
import { getType } from 'typesafe-actions'

import { IFork } from '../models'
import { GitForksAction } from '.'
import { fetchForks } from '../actions'

export interface IForksState {
  readonly forks: IFork[]
  readonly fetching: boolean
  readonly error: IRequestError
}

export default combineReducers<IForksState, GitForksAction>({
  forks: (state = [], action) =>
    action.type === getType(fetchForks.success) ? action.payload : state,
  fetching: (state = false, action) =>
    action.type === getType(fetchForks.request) || (state && !(getType(fetchForks.success) || getType(fetchForks.failure))),
  // tslint:disable-next-line: variable-name
  error: (_state, action) => (action.type === getType(fetchForks.failure) ? action.payload : { message: '', status: 0 }),
})

import Types from 'Types'
import { Epic } from 'redux-observable'
import { filter, switchMap, map, catchError, timeout } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { combineEpics } from 'redux-observable'

import { fetchForks } from '../actions'
import { GitForksAction } from '../reducer'
import * as apiEndpoints from '../apiEndpoints'
import { IFork, Fork } from '../models'

export const fetchForksAction: Epic<GitForksAction, GitForksAction, Types.RootState, Types.Services> = (
  action$,
  // tslint:disable-next-line:variable-name
  _state$,
  { getJSON }
) =>
  action$.pipe(
    filter(isActionOf(fetchForks.request)),
    switchMap(action =>
      getJSON(apiEndpoints.repoForks(action.payload)).pipe(
        timeout(10000),
        map((res: any) => res.map((fork: IFork) => Fork.create(fork))),
        map(fetchForks.success),
        catchError(error => of(fetchForks.failure(error.response ? { message: error.response.message, status: error.status } : error)))
      )
    )
  )

export default combineEpics(
  fetchForksAction,
)
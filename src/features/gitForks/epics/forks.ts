import { Epic } from 'redux-observable'
import { filter, switchMap, map, catchError, timeout, pluck } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { combineEpics } from 'redux-observable'

import { fetchForks } from '../actions'
import * as apiEndpoints from '../apiEndpoints'
import { IFork, Fork } from '../models'

export const fetchForksAction: Epic = (
  action$,
  // tslint:disable-next-line:variable-name
  _state$,
  request
) =>
  action$.pipe(
    filter(isActionOf(fetchForks.request)),
    switchMap(action =>
      request({
        url: apiEndpoints.repoForks(action.payload),
        method: 'GET',
      }).pipe(
        timeout(10000),
        pluck('response'),
        map((res: any) => res.map((fork: IFork) => Fork.create(fork))),
        map(fetchForks.success),
        catchError(error => of(fetchForks.failure(error.response ? { message: error.response.message, status: error.status } : error)))
      )
    )
  )

export default combineEpics(fetchForksAction)

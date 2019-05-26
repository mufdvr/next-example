//import Types from 'Types'
import { Epic } from 'redux-observable'
import { filter, switchMap, map, catchError, timeout, pluck } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { combineEpics } from 'redux-observable'

import { fetchRepos } from '../actions'
//import { GitForksAction } from '../reducer'
import * as apiEndpoints from '../apiEndpoints'

export const fetchReposAction: Epic = (action$, _state$, request) =>
  action$.pipe(
    filter(isActionOf(fetchRepos.request)),
    switchMap(action =>
      request({
        url: apiEndpoints.userRepos(action.payload),
        method: 'GET',
      }).pipe(
        timeout(10000),
        pluck('response'),
        map((res: any) => res.map(({ name }: any) => name)),
        map(fetchRepos.success),
        catchError(error => of(fetchRepos.failure(error.response ? { message: error.response.message, status: error.status } : error)))
      )
    )
  )

export default combineEpics(fetchReposAction)

import { createAsyncAction } from 'typesafe-actions'
import { IForksRequest, IFork } from './models'

import * as types from './actionTypes'

export const fetchRepos = createAsyncAction(types.FETCH_REPOS_REQUEST, types.FETCH_REPOS_SUCCESS, types.FETCH_REPOS_FAILURE)<
  string,
  string[],
  IRequestError
>()

export const fetchForks = createAsyncAction(types.FETCH_FORKS_REQUEST, types.FETCH_FORKS_SUCCESS, types.FETCH_FORKS_FAILURE)<
  IForksRequest,
  IFork[],
  IRequestError
>()

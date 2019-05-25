import { StateObservable, ActionsObservable } from 'redux-observable'
import { Subject, of, throwError } from 'rxjs'
import Types from 'Types'

import * as actions from '../actions'
import * as epics from './repos'
import JSON from './fixtures/repos.json'

describe('Repos Epics', () => {
  const request: string = 'piotrwitek'
  const fetchAction = actions.fetchRepos.request(request)
  const action$ = ActionsObservable.of(fetchAction)
  let state$: StateObservable<Types.RootState>
  beforeEach(() => {
    state$ = new StateObservable<Types.RootState>(new Subject<Types.RootState>(), undefined as any)
  })

  it('fetch repos success', done => {
    const services: any = {
      getJSON: (_url: string): any => of(JSON),
    }

    epics
      .fetchReposAction(action$, state$, services)
      .toPromise()
      .then((outputAction: Types.RootAction) => {
        expect(outputAction).toEqual({
          type: '@FETCH_REPOS_SUCCESS',
          payload: ['30-seconds-of-code'],
        })
        done()
      })
  })

  it('fetch repos failure by network', done => {
    const services: any = {
      getJSON: (_url: string): any => throwError({ message: 'Network Error' }),
    }

    epics
      .fetchReposAction(action$, state$, services)
      .toPromise()
      .then((outputAction: Types.RootAction) => {
        expect(outputAction).toEqual({
          type: '@FETCH_REPOS_FAILURE',
          payload: {
            message: 'Network Error',
          },
        })
        done()
      })
  })

  it('fetch repos failure by 404', done => {
    const services: any = {
      getJSON: (_url: string): any =>
        throwError({
          status: 404,
          response: {
            message: 'Not Found!',
          },
        }),
    }

    epics
      .fetchReposAction(action$, state$, services)
      .toPromise()
      .then((outputAction: Types.RootAction) => {
        expect(outputAction).toEqual({
          type: '@FETCH_REPOS_FAILURE',
          payload: {
            message: 'Not Found!',
            status: 404,
          },
        })
        done()
      })
  })
})

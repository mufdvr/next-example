import { StateObservable, ActionsObservable } from 'redux-observable'
import { Subject, of, throwError } from 'rxjs'
import Types from 'Types'

import * as actions from '../actions'
import * as epics from './forks'
import { IForksRequest, User, Fork } from '../models'
import JSON from './fixtures/forks.json'

describe('Forks searching Epics', () => {
  const request: IForksRequest = { userName: 'piotrwitek', repoName: 'react-redux-typescript-guide' }
  const fetchAction = actions.fetchForks.request(request)
  const action$ = ActionsObservable.of(fetchAction)
  let state$: StateObservable<Types.RootState>
  beforeEach(() => {
    state$ = new StateObservable<Types.RootState>(new Subject<Types.RootState>(), undefined as any)
  })

  it('fetch forks success and create models', done => {
    const services: any = {
      getJSON: (_url: string): any => of(JSON),
    }

    epics
      .fetchForksAction(action$, state$, services)
      .toPromise()
      .then((outputAction: Types.RootAction) => {
        expect(outputAction).toEqual({
          type: '@FETCH_FORKS_SUCCESS',
          payload: [
            new Fork({
              id: 182098153,
              fullName: 'vanely/react-redux-typescript-guide',
              htmlUrl: 'https://github.com/vanely/react-redux-typescript-guide',
              stargazersCount: 0,
              owner: new User({
                id: 25617186,
                login: 'vanely',
                avatarUrl: 'https://avatars1.githubusercontent.com/u/25617186?v=4',
              }),
            }),
          ],
        })
        done()
      })
  })

  it('fetch forks failure by network', done => {
    const services: any = {
      getJSON: (_url: string): any => throwError({ message: 'Network Error' }),
    }

    epics
      .fetchForksAction(action$, state$, services)
      .toPromise()
      .then((outputAction: Types.RootAction) => {
        expect(outputAction).toEqual({
          type: '@FETCH_FORKS_FAILURE',
          payload: {
            message: 'Network Error',
          },
        })
        done()
      })
  })

  it('fetch forks failure by 404', done => {
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
      .fetchForksAction(action$, state$, services)
      .toPromise()
      .then((outputAction: Types.RootAction) => {
        expect(outputAction).toEqual({
          type: '@FETCH_FORKS_FAILURE',
          payload: {
            message: 'Not Found!',
            status: 404,
          },
        })
        done()
      })
  })
})

import forksReducer, { IForksState } from './forks'
import reposReducer, { IReposState } from './repos'
import * as actions from '../actions'
import { Fork } from '../models'

const error = {
  message: 'Not found',
  status: 404,
}

describe('ForksSearching Stories', () => {
  const getInitialState = (initial?: Partial<IForksState>) => forksReducer(initial as IForksState, {} as any)
  const initialState = getInitialState()

  it('should match a snapshot', () => {
    expect(initialState).toMatchSnapshot()
  })

  it('forks request fetching true', done => {
    const state = forksReducer(initialState, actions.fetchForks.request({ userName: '', repoName: '' }))
    expect(state).toEqual({
      ...initialState,
      fetching: true,
    })
    done()
  })

  it('forks fetching success', done => {
    const forks = [new Fork()]
    expect(initialState.forks).toHaveLength(0)
    const state = forksReducer(initialState, actions.fetchForks.success(forks))
    expect(state).toEqual({
      ...initialState,
      forks,
    })
    done()
  })

  it('forks fetching error', done => {
    const state = forksReducer(initialState, actions.fetchForks.failure(error))
    expect(state.forks).toHaveLength(0)
    expect(state).toEqual({
      ...initialState,
      error,
    })
    done()
  })
})

describe('Get Repos Stories', () => {
  const getInitialState = (initial?: Partial<IForksState>) => reposReducer(initial as IReposState, {} as any)
  const initialState = getInitialState()

  it('should match a snapshot', () => {
    expect(initialState).toMatchSnapshot()
  })

  it('repos request fetching true', done => {
    const state = reposReducer(initialState, actions.fetchRepos.request('wtf'))
    expect(state).toEqual({
      ...initialState,
      fetching: true,
    })
    done()
  })

  it('repos fetching success', done => {
    const repos = ['repo-name']
    expect(initialState.repos).toHaveLength(0)
    const state = reposReducer(initialState, actions.fetchRepos.success(repos))
    expect(state).toEqual({
      ...initialState,
      repos,
    })
    done()
  })

  it('repos fetching error', done => {
    const state = reposReducer(initialState, actions.fetchRepos.failure(error))
    expect(state.repos).toHaveLength(0)
    expect(state).toEqual({
      ...initialState,
      error,
    })
    done()
  })
})

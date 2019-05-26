import * as React from 'react'
import { fromEvent } from 'rxjs'
import { debounceTime, map, tap, filter, pluck } from 'rxjs/operators'
import classNames from 'classnames'
import queryString from 'query-string'

import { Input, Button, InputWithSuggestions, Spinner } from 'components'
import { IForksRequest } from '../../models'
import { fetchRepos } from '../../actions'
import { IGitForksState } from '../../reducer'
import styles from './searching.scss'
import { Router } from 'routes'

export interface IPropsFromDispatch {
  fetchRepos: typeof fetchRepos.request
}

export interface IProps {
  readonly className?: any
}

export interface IState extends IForksRequest {
  readonly [key: string]: any
}

type AllProps = IProps & IPropsFromDispatch & IGitForksState

class Searching extends React.Component<AllProps, IState> {
  public static defaultProps = {
    className: '',
  }

  public state: IState = {
    userName: '',
    repoName: '',
  }

  public userNameSubscription: any = null

  public componentWillUnmount = () => this.userNameSubscription.unsubscribe()

  public componentDidMount = () => {
    const {
      fetchRepos,
      repos: { repos },
    } = this.props
    if (!location.search) {
      return
    }
    const { user: userName, repository: repoName } = queryString.parse(location.search) as any
    !repos.length && fetchRepos(userName)
    this.setState({ userName, repoName })
  }

  public handleChange = (value: string | number, name = 'def', onSelect = false): void =>
    this.setState({ [name]: value }, () => onSelect && this.handleClick())

  public handleClick = () => {
    const { userName, repoName } = this.state
    Router.pushRoute(`/search/${userName}/${repoName}/1`)
  }

  public fetchRepos = (node: HTMLInputElement) => {
    const { fetchRepos } = this.props
    try {
      if (!node) {
        return
      }
      this.userNameSubscription = fromEvent(node, 'keyup')
        .pipe(
          tap(() => this.setState({ reposNotFound: false })),
          pluck('target', 'value'),
          map(value => value as string),
          filter(value => value !== ''),
          debounceTime(800)
        )
        .subscribe(userName => fetchRepos(userName))
    } catch (e) {
      console.error(e)
    }
  }

  public render = () => {
    const { className, forks, repos } = this.props
    const { userName, repoName } = this.state
    const wrpClass = classNames(styles.wrapper, className)
    return (
      <div className={wrpClass}>
        <div className={styles.userName}>
          <label className={styles.label}>User name</label>
          <Input
            inputRef={this.fetchRepos}
            onChange={this.handleChange}
            hasError={!!repos.error.message}
            name="userName"
            value={userName}
          />
        </div>
        <div className={styles.spinner}>{repos.fetching && <Spinner />}</div>
        <div className={styles.repoName}>
          <label className={styles.label}>Repository name</label>
          <InputWithSuggestions name="repoName" onChange={this.handleChange} suggestions={repos.repos} value={repoName} />
        </div>
        <Button
          className={styles.button}
          onClick={this.handleClick}
          disabled={forks.fetching || !repoName || !userName}
          loading={forks.fetching}
        >
          Search
        </Button>
      </div>
    )
  }
}

export default Searching

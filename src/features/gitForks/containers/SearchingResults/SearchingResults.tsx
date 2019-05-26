import * as React from 'react'
//import { RouteComponentProps } from 'react-router'
//import queryString from 'query-string'
import { WithRouterProps } from 'next/router'

import styles from './searchingResults.scss'
import { IForksState } from '../../reducer/forks'
import { fetchForks } from '../../actions'
import { Button } from 'components'

export interface IQuery {
  userName: string
  repoName: string
  page: number
}

export interface IProps extends WithRouterProps<IQuery> {
  readonly fetchForks: typeof fetchForks.request
}

type AllProps = IForksState & IProps //& RouteComponentProps

class SearchingResults extends React.Component<AllProps> {
  public componentDidMount = () => {
    const { forks, fetchForks, router } = this.props
    if (!router) return
    const { page, userName, repoName } = router.query as IQuery
    !forks.length && repoName && userName && fetchForks({ repoName, userName, page })
  }

  public componentWillReceiveProps = (nextProps: AllProps) => {
    const { fetchForks, router } = this.props
    if (!router || !nextProps.router) return
    const { page: prevPage, userName: prevUserName, repoName: prevRepoName } = router.query as IQuery
    const { page, userName, repoName } = nextProps.router.query as IQuery
    if (repoName !== prevRepoName || userName !== prevUserName || prevPage !== page) {
      fetchForks({ repoName, userName, page })
    }
  }

  public handleChangePage = (to: number) => () => {
    /*try {
      const { location, history } = this.props
      const { page, user: userName, repository: repoName } = queryString.parse(location.search) as any
      ;+page + to > 0 && history.push(`/search?user=${userName}&repository=${repoName}&page=${+page + to}`)
    } catch (e) {
      console.log(e)
    }
    */
  }

  public renderItems = () => {
    const { forks } = this.props
    return (
      forks &&
      forks.map(fork => (
        <tr key={fork.id}>
          <td>{fork.fullName}</td>
          <td>{fork.owner.login}</td>
          <td>{fork.stargazersCount}</td>
          <td>
            <a href={fork.htmlUrl}>{fork.htmlUrl}</a>
          </td>
        </tr>
      ))
    )
  }

  public render = () => {
    const { forks } = this.props
    if (!forks.length) {
      return null
    }
    return (
      <div className={styles.ibox}>
        <div className={styles.navButtons}>
          <Button onClick={this.handleChangePage(-1)}>{'<< Prev'}</Button>
          <Button onClick={this.handleChangePage(1)}>{'Next >>'}</Button>
        </div>
        <div className={styles.iboxContent}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Owner</th>
                <th>Stars</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>{this.renderItems()}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default SearchingResults

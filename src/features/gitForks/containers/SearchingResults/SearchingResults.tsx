import * as React from 'react'
import queryString from 'query-string'

import styles from './searchingResults.scss'
import { IForksState } from '../../reducer/forks'
import { fetchForks } from '../../actions'
import { Button } from 'components'

export interface IProps {
  readonly fetchForks: typeof fetchForks.request
}

type AllProps = IForksState & IProps

class SearchingResults extends React.Component<AllProps> {
  public componentDidMount = () => {
    const { forks, fetchForks } = this.props
    const { page, user: userName, repository: repoName } = queryString.parse(location.search) as any
    !forks.length && repoName && userName && fetchForks({ repoName, userName, page })
  }

  public componentWillReceiveProps = (nextProps: AllProps) => {
    const { fetchForks } = this.props
    const { page: prevPage, user: prevUserName, repository: prevRepoName } = queryString.parse(location.search) as any
    const { page, user: userName, repository: repoName } = queryString.parse(location.search) as any
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
    }*/
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

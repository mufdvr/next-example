import * as React from 'react'
import { toast } from 'react-toastify'

import { Searching, SearchingResults } from '..'
import styles from './gitForksLayout.scss'
import { Header } from 'components'
import { IForksState } from '../../reducer/forks'

class GitForksLayout extends React.Component<IForksState> {
  public componentWillReceiveProps = (nextProps: IForksState) => {
    const {
      error: { message },
    } = nextProps
    message && toast.error(message)
  }

  public render = () => {
    return (
      <div className={styles.layout}>
        <Header title="GitHub Interface" />
        <Searching className={styles.searching} />
        <SearchingResults />
      </div>
    )
  }
}

export default GitForksLayout

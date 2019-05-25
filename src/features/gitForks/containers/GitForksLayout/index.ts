import GitForksLayout from './GitForksLayout'
import Types from 'Types'
import { connect } from 'react-redux'

const mapStateToProps = (state: Types.RootState) => {
  const { forks, fetching, error } = state.gitForks.forks
  return { forks, fetching, error }
}

export default connect(mapStateToProps)(GitForksLayout)
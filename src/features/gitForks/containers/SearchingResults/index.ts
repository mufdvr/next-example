import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Types from 'Types'

import * as actions from '../../actions'
import SearchingResults from './SearchingResults'

const mapStateToProps = (state: Types.RootState) => {
  const { forks } = state.gitForks
  return { ...forks }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchForks: actions.fetchForks.request,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchingResults)
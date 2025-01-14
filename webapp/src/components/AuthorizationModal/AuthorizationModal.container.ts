import { connect } from 'react-redux'
import {
  getData as getAuthorizations, grantTokenRequest,
  revokeTokenRequest
} from '../../modules/authorization/types'
import {
  GRANT_TOKEN_REQUEST,
  REVOKE_TOKEN_REQUEST
} from 'decentraland-dapps/dist/modules/authorization/actions'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { getLoading } from 'decentraland-dapps/dist/modules/authorization/selectors'
import { RootState } from '../../modules/reducer'
import { getPendingAuthorizationTransactions } from '../../modules/transaction/selectors'
import {
  MapStateProps,
  MapDispatchProps,
  MapDispatch
} from './AuthorizationModal.types'
import AuthorizationModal from './AuthorizationModal'

const mapState = (state: RootState): MapStateProps => ({
  authorizations: getAuthorizations(state),
  pendingTransactions: getPendingAuthorizationTransactions(state),
  isLoading:
    isLoadingType(getLoading(state), GRANT_TOKEN_REQUEST) ||
    isLoadingType(getLoading(state), REVOKE_TOKEN_REQUEST)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onGrant: authorization => dispatch(grantTokenRequest(authorization)),
  onRevoke: authorization => dispatch(revokeTokenRequest(authorization))
})

export default connect(mapState, mapDispatch)(AuthorizationModal)

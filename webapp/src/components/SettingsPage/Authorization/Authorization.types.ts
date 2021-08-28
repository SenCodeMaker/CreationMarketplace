import { Transaction } from 'decentraland-dapps/dist/modules/transaction/types'
import {
  Authorization,
  grantTokenRequest,
  revokeTokenRequest
} from '../../../modules/authorization/types'

export type Props = {
  authorization: Authorization
  authorizations: Authorization[]
  pendingTransactions: Transaction[]
  isLoading?: boolean
  onGrant: typeof grantTokenRequest
  onRevoke: typeof revokeTokenRequest
}

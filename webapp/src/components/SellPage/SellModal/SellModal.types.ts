import { NFT } from '../../../modules/nft/types'
import { Order } from '../../../modules/order/types'
import { createOrderRequest } from '../../../modules/order/actions'
import { Authorization, Wallet } from '../../../modules/authorization/types'

export type Props = {
  nft: NFT
  order: Order | null
  wallet: Wallet | null
  authorizations: Authorization[]
  isLoading: boolean
  onNavigate: (path: string) => void
  onCreateOrder: typeof createOrderRequest
}

import { NFT } from '../../../modules/nft/types'
import { Order } from '../../../modules/order/types'
import { buyOrderRequest } from '../../../modules/order/actions'
import { Authorization, Wallet } from '../../../modules/authorization/types'

export type Props = {
  nft: NFT
  order: Order | null
  wallet: Wallet | null
  authorizations: Authorization[]
  isLoading: boolean
  isOwner: boolean
  isOwned: boolean
  hasInsufficientSPECIES: boolean
  onNavigate: (path: string) => void
  onBuyOrder: typeof buyOrderRequest
}

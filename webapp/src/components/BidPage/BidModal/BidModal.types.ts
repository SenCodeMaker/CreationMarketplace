import { NFT } from '../../../modules/nft/types'
import { placeBidRequest } from '../../../modules/bid/actions'
import { Authorization, Wallet } from '../../../modules/authorization/types'

export type Props = {
  nft: NFT
  wallet: Wallet | null
  authorizations: Authorization[]
  onNavigate: (path: string) => void
  onPlaceBid: typeof placeBidRequest
}

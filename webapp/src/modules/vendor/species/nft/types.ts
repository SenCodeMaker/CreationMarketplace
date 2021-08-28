import { Network } from '@dcl/schemas'
import {
  Country,
  Kingdom,
  Region,
  Sex,
  ThreatStatus
} from '../../../nft/species/types'
import { NFT, NFTCategory, NFTsFetchParams } from '../../../nft/types'
import { Order } from '../../../order/types'
import { VendorName } from '../../types'

export type NFTsFetchFilters = {
  threatStatus?: ThreatStatus[]
  kingdoms?: Kingdom[]
  category?: NFTCategory
  countries?: Country[]
  regions?: Region[]
  sexes?: Sex[]
  contracts?: string[]
  network?: Network
}

export type SpeciesFetchParams = NFTsFetchParams & {
  threatStatus?: ThreatStatus[]
  kingdoms?: Kingdom[]
  countries?: Country[]
  regions?: Region[]
  sexes?: Sex[]
}

export type NFTListFetchResponse = {
  nfts: Omit<NFT<VendorName.SPECIES>, 'vendor'>[]
  orders: Order[]
  total: number
}

export type NFTFetchReponse = {
  nft: Omit<NFT<VendorName.SPECIES>, 'vendor'>
  order: Order | null
}

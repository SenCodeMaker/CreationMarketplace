import { ChainId } from '@dcl/schemas'
import { View } from '../ui/types'
import { NFTsFetchFilters } from '../vendor/nft/types'
import { VendorName } from '../vendor/types'
import { SortDirection } from '../routing/types'
import { SpeciesNFT } from './species/types'
import { Network } from '../contract/types'

export enum NFTSortBy {
  NAME = 'name',
  DISCOVERED_AT = 'discoveredAt',
  COUNTRY = 'country',
  KINGDOM = 'kingdom',
  ORDER_CREATED_AT = 'createdAt',
  PRICE = 'price',
  ThreatStatus = 'threatStatus',
  Sex = 'sex'
}

export enum NFTCategory {
  ANIMALIA = 'ANIMALIA',
  ARCHAEA = 'ARCHAEA',
  BACTERIA = 'BACTERIA',
  PLANTAE = 'PLANTAE',
  PROTOZOA = 'PROTOZOA',
  FUNGI = 'FUNGI',
  CHROMISTA = 'CHROMISTA',
  VIRUSES = 'VIRUSES',
  ENS = 'ENS',
  ART = 'ART'
}

export type Data<V extends VendorName> = V extends VendorName.SPECIES
  ? SpeciesNFT
  : never

export type NFT<V extends VendorName = any> = {
  id: string
  contractAddress: string
  tokenId: string
  activeOrderId: string | null
  owner: string
  name: string
  category: NFTCategory
  image: string
  url: string
  vendor: VendorName
  network: Network
  chainId: ChainId
  data: Data<V>
}

export type NFTsFetchParams = {
  fetchSize: number
  offset: number
  orderBy?: NFTSortBy
  orderDirection?: SortDirection
  category?: NFTCategory
  address?: string
  onlyOnSale?: boolean
  search?: string
}

export type NFTsCountParams = Omit<NFTsFetchParams, 'fetchSize' | 'offset'>

export type NFTsFetchOptions = {
  vendor: VendorName
  view: View
  params: NFTsFetchParams
  filters?: NFTsFetchFilters
}

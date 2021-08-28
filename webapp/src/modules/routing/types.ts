import { Network } from '@dcl/schemas'
import { VendorName } from '../vendor/types'
import { Section } from '../vendor/routing/types'
import { View } from '../ui/types'
import {
  Kingdom,
  ThreatStatus,
  Sex,
  Country,
  Region
} from '../nft/species/types'

export { Section }

export enum SortBy {
  NAME = 'name',
  NEWEST = 'newest',
  RECENTLY_LISTED = 'recently_listed',
  CHEAPEST = 'cheapest',
  COUNTRY = 'country',
  KINGDOM = 'kingdom',
  ThreatStatus = 'threatStatus',
  Sex = 'sex'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export type SearchOptions = {
  view?: View
  vendor?: VendorName
  page?: number
  section?: Section
  sortBy?: SortBy
  onlyOnSale?: boolean
  isMap?: boolean
  isFullscreen?: boolean
  regions?: Region[]
  countries?: Country[]
  kingdoms?: Kingdom[]
  threatStatus?: ThreatStatus[]
  sexes?: Sex[]
  search?: string
  contracts?: string[]
  address?: string
  network?: Network
}

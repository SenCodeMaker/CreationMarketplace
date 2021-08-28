import { Network } from '@dcl/schemas'
import { Section, SortBy } from '../../../../modules/routing/types'
import { browse } from '../../../../modules/routing/actions'
import {
  Country,
  Kingdom,
  Region,
  Sex,
  ThreatStatus
} from '../../../../modules/nft/species/types'

export type Props = {
  count?: number
  section: Section
  sortBy?: SortBy
  search: string
  onlyOnSale?: boolean
  isMap?: boolean
  threatStatus: ThreatStatus[]
  kingdoms: Kingdom[]
  regions: Region[]
  countries: Country[]
  sexes: Sex[]
  contracts: string[]
  network?: Network
  onBrowse: typeof browse
}

export type MapStateProps = Pick<
  Props,
  | 'count'
  | 'section'
  | 'sortBy'
  | 'search'
  | 'onlyOnSale'
  | 'isMap'
  | 'threatStatus'
  | 'kingdoms'
  | 'countries'
  | 'regions'
  | 'sexes'
  | 'contracts'
  | 'network'
>
export type OwnProps = Pick<Props, 'onBrowse'>

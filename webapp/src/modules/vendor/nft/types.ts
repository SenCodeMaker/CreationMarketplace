import { VendorName } from '../types'

import * as species from '../species'

export type NFTsFetchFilters<
  V extends VendorName | unknown = unknown
> = V extends VendorName.SPECIES
  ? species.NFTsFetchFilters
  : V extends unknown
  ? species.NFTsFetchFilters
  : never

import { NFTCategory } from '../nft/types'
import { getSearchCategory } from '../routing/search'
import { SearchOptions } from '../routing/types'
import { NFTsFetchFilters } from './nft/types'
import { VendorName, Disabled } from './types'

export function getFilters(
  vendor: VendorName,
  searchOptions: SearchOptions
): NFTsFetchFilters {
  const {
    section,
    contracts,
    network,
    regions,
    countries,
    threatStatus,
    sexes
  } = searchOptions

  switch (vendor) {
    case VendorName.SPECIES: {
      const category: NFTCategory = getSearchCategory(section!)!

      return {
        category,
        contracts,
        countries,
        regions,
        threatStatus,
        sexes,
        network
      }
    }
    default:
      return {}
  }
}

export function getOriginURL(vendor: VendorName) {
  switch (vendor) {
    case VendorName.SPECIES:
      return 'https://market.species.org'
    default:
      throw new Error(`Base URL for ${vendor} not implemented`)
  }
}

export function isVendor(vendor: string) {
  return Object.values(VendorName).includes(vendor as VendorName)
}

export function isPartner(vendor: string) {
  return isVendor(vendor) && vendor !== VendorName.SPECIES
}

export function getPartners(): VendorName[] {
  const disabledVendors = Object.values(Disabled)

  return Object.values(VendorName).filter(
    vendor => isPartner(vendor) && !disabledVendors.includes(vendor)
  )
}

import { Network } from '@dcl/schemas'
import { View } from '../ui/types'
import { NFTCategory } from '../nft/types'
import { VendorName } from '../vendor/types'
import { Section } from '../vendor/routing/types'
import { SearchOptions, SortBy } from './types'

const SEARCH_ARRAY_PARAM_SEPARATOR = '_'

export function getDefaultOptionsByView(view?: View): SearchOptions {
  return {
    onlyOnSale: view !== View.ACCOUNT,
    sortBy: view === View.ACCOUNT ? SortBy.NEWEST : SortBy.RECENTLY_LISTED
  }
}

export function getSearchParams(options?: SearchOptions) {
  let params: URLSearchParams | undefined
  if (options) {
    params = new URLSearchParams()

    if (options.section) {
      params.set('section', options.section)
    }

    if (options.isMap !== undefined) {
      params.set('isMap', options.isMap.toString())
      // isFullscreen is only set if isMap is true
      if (options.isFullscreen !== undefined) {
        params.set('isFullscreen', options.isFullscreen.toString())
      }
    }

    if (options.vendor) {
      params.set('vendor', options.vendor)
    }
    if (options.page) {
      params.set('page', options.page.toString())
    }
    if (options.sortBy) {
      params.set('sortBy', options.sortBy)
    }
    if (options.onlyOnSale !== undefined) {
      params.set('onlyOnSale', options.onlyOnSale.toString())
    }
    if (options.kingdoms && options.kingdoms.length > 0) {
      params.set('kingdom', options.kingdoms.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.sexes && options.sexes.length > 0) {
      params.set('genders', options.sexes.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.threatStatus && options.threatStatus.length > 0) {
      params.set(
        'threatstatus',
        options.threatStatus.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.regions && options.regions.length > 0) {
      params.set('regions', options.regions.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.countries && options.countries.length > 0) {
      params.set(
        'countries',
        options.countries.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }

    if (options.contracts && options.contracts.length > 0) {
      params.set(
        'contracts',
        options.contracts.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }

    if (options.search) {
      params.set('search', options.search)
    }
    if (options.network && Object.values(Network).includes(options.network)) {
      params.set('network', options.network)
    }
  }
  return params
}

export function getSearchCategory(section: Section) {
  // TODO: Move this to each vendor? Names shortened for brevity here
  const specieSection = Section[VendorName.SPECIES]
  switch (section) {
    case specieSection.ANIMALIA:
      return NFTCategory.ANIMALIA
    case specieSection.ARCHAEA:
      return NFTCategory.ARCHAEA
    case specieSection.BACTERIA:
      return NFTCategory.BACTERIA
    case specieSection.CHROMISTA:
      return NFTCategory.CHROMISTA
    case specieSection.FUNGI:
      return NFTCategory.FUNGI
    case specieSection.PLANTAE:
      return NFTCategory.PLANTAE
    case specieSection.PROTOZOA:
      return NFTCategory.PROTOZOA
    case specieSection.VIRUSES:
      return NFTCategory.VIRUSES
    case specieSection.ENS:
      return NFTCategory.ENS
  }
}

// TODO : find phylum of kingdom
// export function getSearchWearableSection(category: WearableCategory) {
//   const specieSection = Section[VendorName.DECENTRALAND]
//   for (const section of Object.values(specieSection)) {
//     const sectionCategory = getSearchWearableCategory(section)
//     if (category === sectionCategory) {
//       return section
//     }
//   }
// }

// export function getSearchWearableCategory(section: Section) {
//   const DclSection = Section[VendorName.DECENTRALAND]
//   switch (section) {
//     case DclSection.WEARABLES_EYEBROWS:
//       return WearableCategory.EYEBROWS
//     case DclSection.WEARABLES_EYES:
//       return WearableCategory.EYES
//     case DclSection.WEARABLES_FACIAL_HAIR:
//       return WearableCategory.FACIAL_HAIR
//     case DclSection.WEARABLES_HAIR:
//       return WearableCategory.HAIR
//     case DclSection.WEARABLES_MOUTH:
//       return WearableCategory.MOUTH
//     case DclSection.WEARABLES_UPPER_BODY:
//       return WearableCategory.UPPER_BODY
//     case DclSection.WEARABLES_LOWER_BODY:
//       return WearableCategory.LOWER_BODY
//     case DclSection.WEARABLES_FEET:
//       return WearableCategory.FEET
//     case DclSection.WEARABLES_EARRING:
//       return WearableCategory.EARRING
//     case DclSection.WEARABLES_EYEWEAR:
//       return WearableCategory.EYEWEAR
//     case DclSection.WEARABLES_HAT:
//       return WearableCategory.HAT
//     case DclSection.WEARABLES_HELMET:
//       return WearableCategory.HELMET
//     case DclSection.WEARABLES_MASK:
//       return WearableCategory.MASK
//     case DclSection.WEARABLES_TIARA:
//       return WearableCategory.TIARA
//     case DclSection.WEARABLES_TOP_HEAD:
//       return WearableCategory.TOP_HEAD
//   }
// }

export function getURLParamArray<T extends string>(
  search: string,
  paramName: string,
  validValues: string[] = []
) {
  const param = getURLParam<T>(search, paramName)
  return param === null
    ? []
    : (param
        .split(SEARCH_ARRAY_PARAM_SEPARATOR)
        .filter(item => validValues.includes(item as T)) as T[])
}

export function getURLParam<T extends string>(
  search: string,
  paramName: string
) {
  const param = new URLSearchParams(search).get(paramName) as T | null
  return param
}

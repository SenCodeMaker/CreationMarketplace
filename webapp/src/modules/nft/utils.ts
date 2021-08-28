import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Wallet } from '../authorization/types'
import { NFTCategory } from '../nft/types'
import { SortDirection, SortBy } from '../routing/types'
import { addressEquals } from '../wallet/utils'
import { NFT, NFTSortBy } from './types'

export function getNFTId(contractAddress: string, tokenId: string) {
  return tokenId
}

export function getNFTName(nft: Pick<NFT, 'name' | 'category' | 'data'>) {
  if (nft.name) {
    return nft.name
  }

  switch (nft.category) {
    case NFTCategory.ANIMALIA:
    case NFTCategory.ARCHAEA:
    case NFTCategory.BACTERIA:
    case NFTCategory.CHROMISTA:
    case NFTCategory.FUNGI:
    case NFTCategory.PLANTAE:
    case NFTCategory.PROTOZOA:
    case NFTCategory.VIRUSES:
      return nft.data.scientificName
        ? nft.data.scientificName
        : nft.data.vernacularName
          ? nft.data.vernacularName
          : 'speciesNFT'
    case NFTCategory.ENS:
      return t('global.ens')

    case NFTCategory.ART:
      return t('global.art')

    default:
      return t('global.nft')
  }
}

export function getOrder(sortBy: SortBy) {
  let orderBy: NFTSortBy = NFTSortBy.DISCOVERED_AT
  let orderDirection: SortDirection = SortDirection.DESC

  switch (sortBy) {
    case SortBy.NAME: {
      orderBy = NFTSortBy.NAME
      orderDirection = SortDirection.ASC
      break
    }
    case SortBy.NEWEST: {
      orderBy = NFTSortBy.DISCOVERED_AT
      orderDirection = SortDirection.DESC
      break
    }
    case SortBy.COUNTRY: {
      orderBy = NFTSortBy.COUNTRY
      orderDirection = SortDirection.DESC
      break
    }
    case SortBy.KINGDOM: {
      orderBy = NFTSortBy.KINGDOM
      orderDirection = SortDirection.DESC
      break
    }
    case SortBy.Sex: {
      orderBy = NFTSortBy.Sex
      orderDirection = SortDirection.DESC
      break
    }
    case SortBy.ThreatStatus: {
      orderBy = NFTSortBy.ThreatStatus
      orderDirection = SortDirection.DESC
      break
    }
    case SortBy.RECENTLY_LISTED: {
      orderBy = NFTSortBy.ORDER_CREATED_AT
      orderDirection = SortDirection.DESC
      break
    }
    case SortBy.CHEAPEST: {
      orderBy = NFTSortBy.PRICE
      orderDirection = SortDirection.ASC
      break
    }
  }

  return [orderBy, orderDirection] as const
}

export function getSortBy(orderBy: NFTSortBy) {
  let sortBy: SortBy = SortBy.NEWEST

  switch (orderBy) {
    case NFTSortBy.NAME: {
      sortBy = SortBy.NAME
      break
    }
    case NFTSortBy.DISCOVERED_AT: {
      sortBy = SortBy.NEWEST
      break
    }
    case NFTSortBy.KINGDOM: {
      sortBy = SortBy.KINGDOM
      break
    }
    case NFTSortBy.COUNTRY: {
      sortBy = SortBy.COUNTRY
      break
    }
    case NFTSortBy.Sex: {
      sortBy = SortBy.Sex
      break
    }
    case NFTSortBy.ThreatStatus: {
      sortBy = SortBy.ThreatStatus
      break
    }
    case NFTSortBy.ORDER_CREATED_AT: {
      sortBy = SortBy.RECENTLY_LISTED
      break
    }
    case NFTSortBy.PRICE: {
      sortBy = SortBy.CHEAPEST
      break
    }
  }

  return sortBy
}

export function getNFT(
  contractAddress: string | null,
  tokenId: string | null,
  nfts: Record<string, NFT>
): NFT | null {
  if (!contractAddress || !tokenId) {
    return null
  }

  const nftId = getNFTId(contractAddress, tokenId)
  return nftId in nfts ? nfts[nftId] : null
}

export function isOwnedBy(nft: NFT, wallet: Wallet | null) {
  return addressEquals(wallet?.address, nft.owner)
}

export function isOwned(nft: NFT) {
  return nft.data.isOwned
}

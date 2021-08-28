import {
  NFTsFetchFilters,
  NFTListFetchResponse,
  NFTFetchReponse,
  SpeciesFetchParams
} from './types'
import { getSortBy } from '../../../nft/utils'
import { Contract } from '../../services'
import { contracts } from '../../../contract/utils'
import { getCurrentLocale } from 'decentraland-dapps/dist/modules/translation/utils'
import { Locale } from 'decentraland-ui'
import { useParams } from 'react-router'
import { SortDirection } from '../../../routing/types'

export const NFT_SERVER_URL = process.env.REACT_APP_NFT_SERVER_URL!

class NFTAPI {
  fetch = async (params: SpeciesFetchParams, filters?: NFTsFetchFilters) => {
    const request = this.buildRequest(params, filters)
    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set('Content-Type', 'application/json')
    console.log(JSON.stringify(request))
    const response: NFTListFetchResponse = await fetch(
      `${NFT_SERVER_URL}/species`,
      {
        method: 'POST',
        body: JSON.stringify(request),
        headers: requestHeaders
      }
    ).then(resp => resp.json())

    return response
  }

  async fetchOne(contractAddress: string, tokenId: string) {
    const LocateHeader: HeadersInit = new Headers()
    LocateHeader.set('accept-language', getCurrentLocale().locale as Locale)
    const response: NFTFetchReponse = await fetch(
      `${NFT_SERVER_URL}/specyDetails/${tokenId}`,
      {
        headers: LocateHeader
      }
    ).then(resp => resp.json())
    return response
  }

  // async fetchTokenId(x: number, y: number) {
  //   try {
  //     const { id } = await fetch(
  //       `${ATLAS_SERVER_URL}/v2/parcels/${x}/${y}`
  //     ).then(resp => resp.json())
  //     return id
  //   } catch (error) {
  //     return null
  //   }
  // }

  async fetchContracts() {
    try {
      const contracts: Contract[] = await fetch(
        `${NFT_SERVER_URL}/v1/contracts`
      ).then(resp => resp.json())
      return contracts
    } catch (error) {
      return []
    }
  }

  private buildRequest(params: SpeciesFetchParams, filters?: NFTsFetchFilters) {
    return {
      ...params,
      orderAsc: params.orderDirection === SortDirection.ASC,
      ...filters
    }
  }

  private buildQueryString(
    params: SpeciesFetchParams,
    filters?: NFTsFetchFilters
  ): string {
    const queryParams = new URLSearchParams()
    queryParams.append('fetchSize', params.fetchSize.toString())
    queryParams.append('offset', params.offset.toString())
    if (params.orderBy) {
      queryParams.append('sortBy', getSortBy(params.orderBy))
    }
    if (params.category) {
      queryParams.append('category', params.category)
    }
    if (params.address) {
      queryParams.append('address', params.address)
    }
    if (params.onlyOnSale) {
      queryParams.append('onSale', 'true')
    }

    if (params.search) {
      queryParams.set('search', params.search)
    }
    if (filters) {
      if (filters.countries) {
        for (const country of filters.countries) {
          queryParams.append('country', country)
        }
      }
      if (filters.regions) {
        for (const region of filters.regions) {
          queryParams.append('region', region)
        }
      }
      if (filters.kingdoms) {
        for (const kingdom of filters.kingdoms) {
          queryParams.append('kingdom', kingdom)
        }
      }
      if (filters.sexes) {
        for (const sex of filters.sexes) {
          queryParams.append('sex', sex)
        }
      }
      if (filters.threatStatus) {
        for (const threat of filters.threatStatus) {
          queryParams.append('threatStatus', threat)
        }
      }
      if (filters.contracts) {
        for (const address of filters.contracts) {
          if (contracts.some(contract => contract.address === address)) {
            queryParams.append('contract', address)
          }
        }
      }
      if (filters.network) {
        queryParams.append('network', filters.network)
      }
      if (getCurrentLocale().locale as Locale) {
        queryParams.append('locale', getCurrentLocale().locale)
      }
    }

    return queryParams.toString()
  }
}

export const nftAPI = new NFTAPI()

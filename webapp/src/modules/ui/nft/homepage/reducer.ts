import {
  FetchNFTsSuccessAction,
  FETCH_NFTS_SUCCESS
} from '../../../nft/actions'
import { View } from '../../types'

export type HomepageUIState = {
  [View.HOME_ANIMALIA]: string[]
  [View.HOME_ARCHAEA]: string[]
  [View.HOME_BACTERIA]: string[]
  [View.HOME_CHROMISTA]: string[]
  [View.HOME_FUNGI]: string[]
  [View.HOME_PLANTAE]: string[]
  [View.HOME_PROTOZOA]: string[]
  [View.HOME_VIRUSES]: string[]
}

const INITIAL_STATE: HomepageUIState = {
  [View.HOME_ANIMALIA]: [],
  [View.HOME_ARCHAEA]: [],
  [View.HOME_BACTERIA]: [],
  [View.HOME_CHROMISTA]: [],
  [View.HOME_FUNGI]: [],
  [View.HOME_PLANTAE]: [],
  [View.HOME_PROTOZOA]: [],
  [View.HOME_VIRUSES]: []
}

type UIReducerAction = FetchNFTsSuccessAction

export function homepageReducer(
  state: HomepageUIState = INITIAL_STATE,
  action: UIReducerAction
) {
  switch (action.type) {
    case FETCH_NFTS_SUCCESS: {
      const nftIds = action.payload.nfts.map(nft => nft.id)

      switch (action.payload.options.view) {
        case View.HOME_ANIMALIA: {
          return {
            ...state,
            [View.HOME_ANIMALIA]: nftIds
          }
        }
        case View.HOME_ARCHAEA: {
          return {
            ...state,
            [View.HOME_ARCHAEA]: nftIds
          }
        }
        case View.HOME_CHROMISTA: {
          return {
            ...state,
            [View.HOME_CHROMISTA]: nftIds
          }
        }
        case View.HOME_FUNGI: {
          return {
            ...state,
            [View.HOME_FUNGI]: nftIds
          }
        }
        case View.HOME_PLANTAE: {
          return {
            ...state,
            [View.HOME_PLANTAE]: nftIds
          }
        }
        case View.HOME_PROTOZOA: {
          return {
            ...state,
            [View.HOME_PROTOZOA]: nftIds
          }
        }
        case View.HOME_VIRUSES: {
          return {
            ...state,
            [View.HOME_VIRUSES]: nftIds
          }
        }
        case View.HOME_BACTERIA: {
          return {
            ...state,
            [View.HOME_BACTERIA]: nftIds
          }
        }
        default:
          return state
      }
    }
    default:
      return state
  }
}

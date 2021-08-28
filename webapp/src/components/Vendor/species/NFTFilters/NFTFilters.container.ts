import { connect } from 'react-redux'

import { RootState } from '../../../../modules/reducer'
import { getCount } from '../../../../modules/ui/nft/browse/selectors'
import {
  getSection,
  getSortBy,
  getOnlyOnSale,
  getIsMap,
  getCountries,
  getKingdoms,
  getThreatStatus,
  getSexes,
  getSearch,
  getContracts,
  getNetwork
} from '../../../../modules/routing/selectors'
import { MapStateProps } from './NFTFilters.types'
import NFTFilters from './NFTFilters'

const mapState = (state: RootState): MapStateProps => ({
  count: getCount(state),
  section: getSection(state),
  sortBy: getSortBy(state),
  search: getSearch(state),
  onlyOnSale: getOnlyOnSale(state),
  isMap: getIsMap(state),
  countries: getCountries(state),
  regions: [],
  kingdoms: getKingdoms(state),
  sexes: getSexes(state),
  threatStatus: getThreatStatus(state),
  contracts: getContracts(state),
  network: getNetwork(state)
})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(NFTFilters)

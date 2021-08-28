import React from 'react'

import { VendorName } from '../../../modules/vendor/types'
import { NFTFilters as SpeciesNFTFilters } from '../species/NFTFilters'
import { Props } from './NFTFilters.types'
import './NFTFilters.css'

// TODO: Code on each NFTFilters can be extracted
const NFTFilters = (props: Props) => {
  const { vendor, onBrowse } = props

  switch (vendor) {
    case VendorName.SPECIES:
    default:
      return <SpeciesNFTFilters onBrowse={onBrowse} />
  }
}

export default React.memo(NFTFilters)

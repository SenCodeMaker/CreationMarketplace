import React, { useCallback } from 'react'

import { Section } from '../../../modules/vendor/routing/types'
import { Section as SpeciesSection } from '../../../modules/vendor/species/routing/types'
import { VendorName } from '../../../modules/vendor/types'
import { NFTSidebar as SpeciesNFTSidebar } from '../species/NFTSidebar'
import { Props } from './NFTSidebar.types'

const NFTSidebar = (props: Props) => {
  const { vendor, section, onBrowse } = props

  const handleOnBrowse = useCallback(
    (section: Section) => {
      onBrowse({ section })
    },
    [onBrowse]
  )

  switch (vendor) {
    case VendorName.SPECIES:
    default:
      return (
        <SpeciesNFTSidebar section={section} onMenuItemClick={handleOnBrowse} />
      )
  }
}

export default React.memo(NFTSidebar)

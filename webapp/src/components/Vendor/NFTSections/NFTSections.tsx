import React from 'react'

import { VendorName } from '../../../modules/vendor/types'
import { NFTSections as SpeciesNFTSections } from '../species/NFTSections'
import { Section as SpeciesSection } from '../../../modules/vendor/species/routing/types'

import { Props } from './NFTSections.types'

const NFTSections = (props: Props) => {
  const { vendor, address, section, onSectionClick } = props

  // TODO: This should be on a generic path like PartnerSidebar
  switch (vendor) {
    case VendorName.SPECIES:
    default:
      return (
        <SpeciesNFTSections
          section={section as SpeciesSection}
          onSectionClick={onSectionClick}
        />
      )
  }
}

export default React.memo(NFTSections)

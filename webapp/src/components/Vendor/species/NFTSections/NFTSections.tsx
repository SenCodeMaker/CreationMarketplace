import React from 'react'

import { Section } from '../../../../modules/vendor/species/routing/types'
import { Menu } from '../../../Menu'
import { MenuItem } from '../../../Menu/MenuItem'
import { Props } from './NFTSections.types'

const NFTSections = (props: Props) => {
  const { section, onSectionClick } = props

  return (
    <Menu className="NFTSections">
      {[
        Section.ALL,
        Section.ANIMALIA,
        Section.ARCHAEA,
        Section.BACTERIA,
        Section.CHROMISTA,
        Section.FUNGI,
        Section.PLANTAE,
        Section.PROTOZOA,
        Section.VIRUSES
      ].map(menuSection => (
        <MenuItem
          key={menuSection}
          value={menuSection}
          currentValue={section}
          onClick={onSectionClick}
        />
      ))}

      {/* TODO: insert phylum for nested levels
       {[Section.LAND, Section.PARCELS, Section.ESTATES].includes(section!)
        ? [Section.PARCELS, Section.ESTATES].map(menuSection => (
            <MenuItem
              key={menuSection}
              value={menuSection}
              currentValue={section}
              onClick={onSectionClick}
              nestedLevel={1}
            />
          ))
        : null} */}

      {/* <MenuItem
        value={Section.ENS}
        currentValue={section}
        onClick={onSectionClick}
      /> */}
    </Menu>
  )
}

export default React.memo(NFTSections)

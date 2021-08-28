import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Popup } from 'decentraland-ui'
import { BaseSpecies } from './BaseSpecies/BaseSpecies'
import { Props } from './Species.types'

const Species = (props: Props) => {
  const { withTooltip, ...speciesProps } = props

  if (withTooltip && !speciesProps.network) {
    throw new Error(
      'You need to specify the SPECIES network if you\'re going to show a tooltip'
    )
  }

  return (
    <Popup
      content={t('species.running_on', {
        network: t(`networks.${speciesProps.network?.toLowerCase()}`)
      })}
      disabled={!withTooltip}
      position="top center"
      trigger={<BaseSpecies {...speciesProps} />}
    />
  )
}

export default React.memo(Species)

import React, { useEffect, useState } from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

import { isInsufficientSpecies } from '../../../modules/bid/utils'
import { Props } from './WarningMessage.types'
import './WarningMessage.css'

const WarningMessage = (props: Props) => {
  const { nft, bid } = props

  const [hasInsufficientSpecies, setHasInsufficientSpecies] = useState(false)

  useEffect(() => {
    isInsufficientSpecies(bid)
      .then(setHasInsufficientSpecies)
      .catch(error =>
        console.error(
          `Could not get the Species from bidder ${bid.bidder}`,
          error
        )
      )
  }, [bid])

  if (hasInsufficientSpecies) {
    return (
      <div className="WarningMessage">
        {t('bid.not_enough_mana_on_bid_placed')}
      </div>
    )
  } /*lse if (!isValidFingerprint) {
    return (
      <div className="WarningMessage">
        {t('bid.invalid_fingerprint_on_bid_placed')}
      </div>
    )
  }*/

  return null
}

export default React.memo(WarningMessage)

import React from 'react'
import { Props } from './ThreatStatusTag.types'
import './ThreatStatusTag.css'
import { ThreatStatus } from '../../../modules/nft/species/types'

const ThreatStatusTag = (props: Props) => {
  const { nft } = props
  const threatStatus = nft.data.threatStatus!
  return (
    <div className="ThreatStatusTag tags">
      <div
        className={
          'icon threatStatus_' +
          Object.values(ThreatStatus)
            .find(x => x === threatStatus)
            ?.toLocaleLowerCase()
        }
        title={Object.values(ThreatStatus)
          .find(x => x === threatStatus)
          ?.toLocaleLowerCase()}
      />
    </div>
  )
}

export default ThreatStatusTag

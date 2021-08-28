import React from 'react'
import { Props } from './SexTag.types'
import './SexTag.css'
import { Sex } from '../../../modules/nft/species/types'

const SexTag = (props: Props) => {
  const { nft } = props
  const sex = nft.data.sex!
  return (
    <div className="SexTag tags">
      <div
        className={
          'icon sex_' +
          Object.values(Sex).find(x => x === sex)?.toLocaleLowerCase()
        }
        title={Object.values(Sex)
          .find(x => x === sex)
          ?.toLocaleLowerCase()}
      />
    </div>
  )
}

export default SexTag

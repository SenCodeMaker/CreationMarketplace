import React from 'react'
import { Header } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props } from './Description.types'
import './Description.css'

const Description = (props: Props) => {
  console.log(props)
  console.log(props.descriptions)
  if (!props.descriptions || props.descriptions.length === 0) {
    return props.text ? (
      <div className="Description">
        <Header sub>{t('nft_page.description')}</Header>
        <div className="description-text">{props.text}</div>
      </div>
    ) : null
  } else {
    return (
      <div className="Description">
        <Header sub>{t('nft_page.description')}</Header>
        {props.descriptions.map(desc => (
          <div className="description-text" key={desc.id}>{ desc.description }</div>
        ))}
      </div>
    )
  }
}

export default React.memo(Description)

import React, { useMemo } from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Row } from 'decentraland-ui'
import { ArrayFilter } from '../ArrayFilter'
import { SelectFilter } from '../SelectFilter'
import { Props } from './FiltersMenu.types'
import { Network } from '@dcl/schemas'
import { contracts } from '../../../../modules/contract/utils'
import {
  Country,
  COUNTRY_NAME,
  Kingdom,
  Region,
  Sex,
  ThreatStatus
} from '../../../../modules/nft/species/types'

export const ALL_FILTER_OPTION = 'ALL'

const FiltersMenu = (props: Props) => {
  const {
    selectedCollection,
    selectedSexes,
    selectedKingdoms,
    selectedRegions,
    selectedCountries,
    selectedThreatStatus,
    selectedNetwork,
    onCollectionsChange,
    onThreatStatusChange,
    onCountryChange,
    onRegionChange,
    onSexChange,
    onKingdomChange,
    onNetworkChange
  } = props

  const collectionOptions = useMemo(() => {
    return [
      {
        value: ALL_FILTER_OPTION,
        text: t('nft_filters.all_collections')
      },
      ...contracts.map(contract => ({
        value: contract.address,
        text: contract.name
      }))
    ]
  }, [])

  const sexOptions = useMemo(() => {
    const options = Object.values(Sex)
    return options.map(sex => ({
      value: sex,
      text: t(`sex.${sex.toLocaleLowerCase()}`)
    }))
  }, [])

  const kingdomOptions = useMemo(() => {
    const options = Object.values(Kingdom)
    return options.map(kingdom => ({
      value: kingdom,
      text: t(`kingdom.${kingdom.toLocaleLowerCase()}`)
    }))
  }, [])

  const regionOptions = useMemo(() => {
    const options = Object.values(Region)
    return options.map(region => ({
      value: region,
      text: t(`region.${region.toLocaleLowerCase()}`)
    }))
  }, [])

  const countryOptions = useMemo(() => {
    const options = Object.values(Country)
    return options.map(country => ({
      value: country,
      text: COUNTRY_NAME[country]
    }))
  }, [])

  const onCountryChangeOneValue: (option: string) => void = function(
    option: string
  ) {
    onCountryChange([option])
  }

  const threatStatusOptions = useMemo(() => {
    const options = Object.values(ThreatStatus)
    return options.map(threatStatus => ({
      value: threatStatus,
      text: t(`threatStatus.${threatStatus.toLocaleLowerCase()}`)
    }))
  }, [])

  const networkOptions = useMemo(() => {
    const options = Object.values(Network).filter(
      value => typeof value === 'string'
    ) as Network[]
    return [
      {
        value: ALL_FILTER_OPTION,
        text: t('nft_filters.all_networks')
      },
      ...options.map(network => ({
        value: network,
        text: t(`networks.${network.toLowerCase()}`)
      }))
    ]
  }, [])

  return (
    <>
      <Row>
        <SelectFilter
          name={t('nft_filters.collection')}
          value={selectedCollection || ALL_FILTER_OPTION}
          options={collectionOptions}
          onChange={onCollectionsChange}
        />
        <SelectFilter
          name={t('nft_filters.network')}
          value={selectedNetwork || ALL_FILTER_OPTION}
          options={networkOptions}
          onChange={network => onNetworkChange(network as Network)}
        />
      </Row>
      <Row>
        <SelectFilter
          name={t('nft_filters.country')}
          value={selectedCountries[0] || ALL_FILTER_OPTION}
          options={countryOptions}
          onChange={onCountryChangeOneValue}
        />
        <ArrayFilter
          name={t('nft_filters.region')}
          values={selectedRegions}
          options={regionOptions}
          onChange={onRegionChange}
        />
      </Row>
      <Row>
        <ArrayFilter
          name={t('nft_filters.threatStatus')}
          values={selectedThreatStatus}
          options={threatStatusOptions}
          onChange={onThreatStatusChange}
        />
      </Row>
      <Row>
        {/* <ArrayFilter
          name={t('nft_filters.kingdom')}
          values={selectedKingdoms}
          options={kingdomOptions}
          onChange={onKingdomChange}
        /> */}
        <ArrayFilter
          name={t('nft_filters.sex')}
          values={selectedSexes}
          options={sexOptions}
          onChange={onSexChange}
        />
      </Row>
    </>
  )
}

FiltersMenu.defaultValues = {
  selectedSexes: [],
  selectedKingdoms: [],
  selectedThreadStatus: []
}

export default React.memo(FiltersMenu)

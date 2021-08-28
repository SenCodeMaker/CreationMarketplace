import { Network } from '@dcl/schemas'

export type Props = {
  selectedCollection?: string
  selectedThreatStatus: string[]
  selectedSexes: string[]
  selectedKingdoms: string[]
  selectedRegions: string[]
  selectedCountries: string[]
  selectedNetwork?: Network
  onCollectionsChange: (contract: string) => void
  onSexChange: (options: string[]) => void
  onThreatStatusChange: (options: string[]) => void
  onKingdomChange: (options: string[]) => void
  onCountryChange: (options: string[]) => void
  onRegionChange: (options: string[]) => void
  onNetworkChange: (network: Network) => void
}

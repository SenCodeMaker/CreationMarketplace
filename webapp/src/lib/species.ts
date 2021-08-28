import BN from 'bn.js'

const SPECIES_SYMBOL = '⏣'

let oneEthInSpecies: BN | undefined

export function formatSpecies(value: string) {
  if (!oneEthInSpecies) {
    oneEthInSpecies = new BN('1000000000000000000') // 10 ** 18
  }
  const species = new BN(value).divRound(oneEthInSpecies)
  return species.toNumber().toLocaleString()
}

export function toSPECIES(num: number) {
  return num > 0 ? `${SPECIES_SYMBOL} ${num.toString()}` : ''
}

export function fromSPECIES(species: string) {
  const num = species
    .split(SPECIES_SYMBOL + ' ')
    .join('')
    .split(/[,|.]/)
    .join('')

  const result = parseInt(num, 10)

  if (isNaN(result) || result < 0) {
    return 0
  }

  return result
}

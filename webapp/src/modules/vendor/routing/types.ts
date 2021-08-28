import * as species from '../species'
import { VendorName } from '../types'

export type Section = species.Section

export const Section = {
  [VendorName.SPECIES]: { ...species.Section }
} as const

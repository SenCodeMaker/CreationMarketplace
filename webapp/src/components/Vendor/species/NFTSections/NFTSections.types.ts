import { Section } from '../../../../modules/vendor/species/routing/types'

export type Props = {
  section?: Section
  onSectionClick: (section: Section) => void
}

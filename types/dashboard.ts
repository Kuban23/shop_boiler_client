import { IBoilerPart } from './boilerparts'

export interface IDashboardSlider {
  items: IBoilerPart[]
  skeleton: boolean
  goToPartPage?: boolean
}

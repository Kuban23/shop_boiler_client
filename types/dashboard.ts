import { IBoilerPart } from './boilerparts'

export interface IDashboardSlider {
  items: IBoilerPart[]
  skeleton: boolean
  goToPartPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}

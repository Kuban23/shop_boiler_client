export interface IOrderAccordionProps {
  setOrderIsReady: (arg0: boolean) => void
  showDoneIcon: boolean
}

export interface IMakePay {
  url: string
  amount: number
  description: string
}

export interface ICheckPay {
  url: string
  paymentId: string
}

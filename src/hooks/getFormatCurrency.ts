export const getFormatCurrency = (changePercent24Hr: number) => {
  return changePercent24Hr < 0 ? 'currency-fall' : 'currency-growth'
}
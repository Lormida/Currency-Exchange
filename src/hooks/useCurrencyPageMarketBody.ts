import { getDegreeCalc } from '@/helpers/getDegreeCalc'
import { getDataCurrency } from '@/helpers/getDataCurrency'
import { getRelativeSupply } from '@/helpers/getRelativeSupply'
import { menuItem } from '@/utils/types'

export const useCurrencyPageMarketBody = () => {
  const menu = [
    {
      title: 'MARKET CAP',
      body: `${getDegreeCalc(getDataCurrency.value.marketCapUsd, 9)}  Milliards`,
    },
    {
      title: 'Volume (24h)',
      body: `${getDegreeCalc(getDataCurrency.value.volumeUsd24Hr, 9)} Milliards`,
      footerChangePercent: `${getDegreeCalc(getDataCurrency.value.changePercent24Hr, 9)}%`,
    },
    {
      title: 'Circulating supply',
      body: `${getDegreeCalc(getDataCurrency.value.supply, 9)}  Milliards ${getDataCurrency.value.symbol} `,
      footerLight: getRelativeSupply.value,
    },
    {
      title: 'Average price (24h)',
      body: `${(+getDataCurrency.value.vwap24Hr).toFixed(2)}`,
    },
    {
      title: 'Popularity',
      body: `${getDataCurrency.value.rank}`,
    },
  ] as menuItem[]

  return { menu }
}

import { PurchasedCurrency, Currency } from "@/store/state";
import ApiService from "@/utils/ApiService";
import { reactive } from "vue";

//* Bag => array actual prices
export const getActualCurrencyPrices = async (bag: PurchasedCurrency[]) => {

  const bagCurrencyActualPrices: any = reactive({});
  const bagCurrencyPromises = [] as Promise<Currency>[];
  bag.forEach((currency: PurchasedCurrency) =>
    bagCurrencyPromises.push(ApiService.getSpecificCurrency(currency.name)));

  await Promise.all(bagCurrencyPromises)
    .then((purchasedCurrencies: Currency[]) => {
      purchasedCurrencies.forEach((purchasedCurrency: Currency) => {
        bagCurrencyActualPrices[`${purchasedCurrency.id}`] = +purchasedCurrency.priceUsd;
      });
    })
  return bagCurrencyActualPrices
};

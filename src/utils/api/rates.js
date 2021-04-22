/**
 * This provides interface for ratesapi.io
 * https://ratesapi.io/documentation/
 */
import axios from "axios";

const baseUrl =
  process.env.RATES_API_BASE_URL || "https://api.ratesapi.io/api/";

const client = axios.create({
  baseURL: baseUrl,
});

/**
 * Fetchs current rates
 * @param {string} base base currency
 */
export const getCurrentRates = (base) => {
  return client
    .get("latest", { params: { base: base } })
    .then((response) => response.data)
    // This is done so there is no neeed to hardcode a list of currencies besides EUR
    .then((data) => {
      const baseCurrencyObject = { [data.base]: 1 };
      return {
        ...data,
        rates: {...baseCurrencyObject, ...data.rates}
      };
    });
};

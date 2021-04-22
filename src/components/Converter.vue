<template>
  <div>
    <div>
      <select name="base-currency" id="base-currency" v-model="selectedBase">
        <option
          v-for="currency in baseCurrencies"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
      <input v-model="baseValue" type="number" name="base-currency-value" />
    </div>
    <div>
      <select
        name="target-currency"
        id="target-currency"
        v-model="selectedTarget"
      >
        <option
          v-for="currency in targetCurrencies"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
      <input
        :value="convertedValue"
        type="number"
        name="target-currency-value"
      />
    </div>
  </div>
</template>

<script>
import { getCurrentRates } from "@/utils/api/rates";

export default {
  name: "Converter",
  data() {
    return {
      currencyRates: {},
      selectedBase: "EUR",
      selectedTarget: "",
      baseValue: 1,
    };
  },
  computed: {
    targetCurrencies() {
      return this.baseCurrencies.filter(
        (currency) => currency !== this.selectedBase
      );
    },
    convertedValue() {
      return this.convertValue(
        this.baseValue,
        this.currencyRates[this.selectedBase],
        this.currencyRates[this.selectedTarget]
      );
    },
    baseCurrencies() {
      return Object.keys(this.currencyRates);
    },
  },
  async mounted() {
    const response = await getCurrentRates(this.selectedBase);
    this.currencyRates = response.rates;
  },
  methods: {
    convertValue(baseValue, baseRate, targetRate) {
      console.log("args", ...arguments);
      return (baseValue * targetRate) / baseRate;
    },
  },
};
</script>

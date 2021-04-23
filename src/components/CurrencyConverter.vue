<template>
  <v-row>
    <v-col>
      <v-autocomplete
        filled
        rounded
        label="Currency"
        name="target-currency"
        :value="selectedTarget"
        @input="handleSelectedCurrency"
        :items="targetCurrencies"
      >
      </v-autocomplete>
    </v-col>
    <v-col>
      <v-text-field
        filled
        rounded
        label="Amount"
        :value="convertedValue"
        @input="handleValue"
        type="number"
        name="target-currency-value"
      />
    </v-col>
  </v-row>
</template>

<script>
import { convertValue } from "@/utils/convert";

export default {
  name: "CurrencyConverter",
  props: { baseValue: String, baseCurrency: String, currencyRates: Object },
  data() {
    return {
      selectedTarget: "",
    };
  },
  computed: {
    targetCurrencies() {
      return Object.keys(this.currencyRates);
      //.filter((currency) => currency !== this.baseCurrency);
    },
    convertedValue() {
      return convertValue(
        this.baseValue,
        this.currencyRates[this.baseCurrency],
        this.currencyRates[this.selectedTarget]
      );
    },
  },
  methods: {
    handleSelectedCurrency(value) {
      this.selectedTarget = value;
    },
    handleValue(value) {
      this.$emit("update:currency", this.selectedTarget);
      this.$emit("update:value", value);
    },
  },
};
</script>

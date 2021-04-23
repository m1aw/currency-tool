<template>
  <v-row class="currency-converter-row">
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

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .currency-converter-row {
    // since we know the scructure here we can be a bit more specific without relying on classes
    .col:first-child {
      padding-right: 0;
      .v-text-field--rounded {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .col:last-child {
      padding-left: 0;
      .v-text-field--rounded {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}
</style>

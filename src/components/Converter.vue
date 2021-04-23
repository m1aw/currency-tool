<template>
  <v-container class="white px-2 py-4 pa-sm-4 rounded-lg elevation-2">
    <currency-converter
      v-for="n in rows"
      :key="n"
      :baseCurrency="selectedBase"
      :baseValue="baseValue"
      :currencyRates="currencyRates"
      @update:value="baseValue = $event"
      @update:currency="selectedBase = $event"
    />
    <div class="d-flex justify-end">
      <v-btn outlined fab large color="green" @click="addRow">
        <span class="d-sr-only">Add row</span>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        class="ml-3"
        outlined
        fab
        large
        color="red"
        :disabled="!canRemoveRows"
        @click="removeRow"
      >
        <span class="d-sr-only">Remove row</span>
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { getCurrentRates } from "@/utils/api/rates";
import CurrencyConverter from "./CurrencyConverter.vue";
const INITIAL_NUMBER_OF_ROLES = 2;
export default {
  components: { CurrencyConverter },
  name: "Converter",
  data() {
    return {
      currencyRates: {},
      selectedBase: "EUR",
      selectedTarget: "",
      baseValue: "1",
      rows: INITIAL_NUMBER_OF_ROLES,
    };
  },
  computed: {
    baseCurrencies() {
      return Object.keys(this.currencyRates);
    },
    canRemoveRows() {
      return this.rows > INITIAL_NUMBER_OF_ROLES;
    },
  },
  async mounted() {
    const response = await getCurrentRates(this.selectedBase);
    this.currencyRates = response.rates;
  },
  methods: {
    addRow() {
      this.rows++;
    },
    removeRow() {
      if (this.canRemoveRows) {
        this.rows--;
      }
    },
  },
};
</script>

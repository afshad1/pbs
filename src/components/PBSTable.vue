<template>
  <div>
    <!-- ForEach item in select input create a new table -->
    <div v-for="v in aktiva_kats" :key="v.value">
      <b-table
      outlined
      :fields="fields"
      :items="pbsdata"
      :filter="v.value"
      :filter-function="filterPbs"
      head-variant="light">
      <!-- Display name Type in header -->
      <template v-slot:head(type)>
        {{ v.text }}
      </template>

      <!-- TODO: Display calculated sum of Percent in header -->
      <!-- <template v-slot:head(percent)>
        {{ calcKatPercent() }}
      </template> -->

      <!-- Display  calculated sum of Value in header -->
      <template v-slot:head(value)>
        {{ calcKatSum(v.value) }}
      </template>

      <!-- Show Type in Bold in cells -->
      <template v-slot:cell(type)="data">
        <b>{{ data.value }}</b>
      </template>

      <!-- Display delete button in cells -->
      <template v-slot:cell(delete)="data">
        <b-button @click="deleteAktiva(data.item)">X</b-button>
      </template>

      </b-table>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'PBSTable',
  props: {
    formData: {
      type: Object,
    },
  },
  data() {
    return {
      // TODO: Exlude categories from here and fetch from App.vue
      aktiva_kats: [
        { text: 'Liquides Vermögen / Bargeld', value: 'liq' },
        { text: 'Immobilien', value: 'immo' },
      ],
      fields: [
        { key: 'type', label: 'Type' },
        {
          key: 'percent',
          label: '100%',
          formatter: (value, key, item) => {
            // this.calcKatSum(item.kat) might be not cheap as it calculates sum on each row
            // - todo better way, without formatter and with function
            const result = ((item.value / this.calcKatSum(item.kat)) * 100).toFixed(2).concat('%');
            return result;
          },
        },
        { key: 'value', label: 'Value' },
        { key: 'delete', label: 'Löschen' },
      ],
      pbsdata: [
        {
          id: uuidv4(),
          kat: 'liq',
          type: 'Girokonten',
          value: '100000',
        },
        {
          id: uuidv4(),
          kat: 'liq',
          type: 'Festfelder',
          value: '100000',
        },
        {
          id: uuidv4(),
          kat: 'liq',
          type: 'Sparbücher',
          value: '100000',
        },
        {
          id: uuidv4(),
          kat: 'immo',
          type: 'Eigenheime',
          value: '200000',
        },
      ],
    };
  },
  methods: {
    deleteAktiva(item) {
      const { id } = item;
      const index = this.pbsdata.map((x) => x.id).indexOf(id);
      this.pbsdata.splice(index, 1);
    },
    filterPbs(value, filter) {
      if (value.kat === filter) {
        return true;
      }
      return false;
    },
    calcKatSum(kat) {
      let katSum = 0;
      const filteredData = this.pbsdata.filter((filter) => filter.kat === kat);
      filteredData.forEach((k) => {
        katSum += (parseFloat(k.value));
      });
      return katSum;
    },
    // TODO: Calculations of percentage
    calcKatPercent() {
      const percentSum = 0;

      return percentSum;
    },
  },
  watch: {
    formData() {
      this.pbsdata.push(this.formData);
    },
  },
  // computed: {
  //   liquidSum() {
  //     console.log('liquidSum');
  //     let liquidSum = 0;
  //     this.pbsdata.forEach((liq) => {
  //       liquidSum += (parseFloat(liq.value));
  //     });
  //     return liquidSum;
  //   },
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

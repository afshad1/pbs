<template>
  <div>
    <b-container fluid class="example">
      <b-row>
        <!-- For each category in cats -->
        <b-col v-for="k in cats" :key="k.cat">
        <div v-for="type in types" :key="type.value">
          <b-table
          outlined fixed striped small
          :fields="fields"
          :items="pbsdata"
          v-if="type.cat === k.cat"
          :filter="type.value"
          :filter-function="filterPbs"
          head-row-variant="info"
          >

          <!-- Display Type as Name in header -->
          <template v-slot:head(name)>
            {{ type.text }}
          </template>

          <!-- TODO: Display calculated sum of Percent in header -->
          <!-- <template v-slot:head(percent)>
            {{ calcKatPercent() }}
          </template> -->

          <!-- Display  calculated sum of Value in header -->
          <template v-slot:head(value)>
            {{ calcTypeSum(type.value) }}
          </template>

          <!-- Show Type in Bold in cells -->
          <template v-slot:cell(name)="data">
            <b>{{ data.value }}</b>
          </template>

          <!-- Display delete button in cells -->
          <template v-slot:cell(delete)="data">
            <!-- <b-button size="sm" variant="danger" @click="deleteAktiva(data.item)"> -->
              <b-link @click="deleteAktiva(data.item)">
              <b-icon-trash-fill font-scale="1.5"></b-icon-trash-fill>
              </b-link>
            <!-- </b-button> -->
          </template>

          </b-table>
        </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { BIconTrashFill } from 'bootstrap-vue';

export default {
  components: {
    BIconTrashFill,
  },
  name: 'PBSTable',
  props: {
    formData: {
      type: Object,
    },
  },
  data() {
    return {
      // TODO: Exlude cats/types from here and fetch from App.vue
      cats: [
        { cat: 'aktiva' },
        { cat: 'passiva' },
      ],
      types: [
        { text: 'Liquides Vermögen', value: 'liq', cat: 'aktiva' },
        { text: 'Immobilien', value: 'immo', cat: 'aktiva' },
        { text: 'Verbindlichkeiten', value: 'verbind', cat: 'passiva' },
      ],
      fields: [
        { key: 'name', label: 'Name' },
        {
          key: 'percent',
          label: '100%',
          formatter: (val, key, item) => {
            // Get pre-calculated sum value of category to avoid recalculation on each call
            const index = this.types.findIndex(({ value }) => value === item.type);
            const result = ((item.value / this.types[index].sum) * 100).toFixed(2).concat('%');
            return result;
          },
        },
        {
          key: 'value',
          label: 'Value',
          formatter: (item) => {
            const result = this.formatCurrency(item);
            return result;
          },
        },
        { key: 'delete', label: 'Löschen' },
      ],
      pbsdata: [
        {
          id: uuidv4(),
          cat: 'aktiva',
          type: 'liq',
          name: 'Girokonten',
          value: '100000',
        },
        {
          id: uuidv4(),
          cat: 'aktiva',
          type: 'liq',
          name: 'Festgelder',
          value: '100000',
        },
        {
          id: uuidv4(),
          cat: 'aktiva',
          type: 'liq',
          name: 'Sparbücher',
          value: '100000',
        },
        {
          id: uuidv4(),
          cat: 'aktiva',
          type: 'immo',
          name: 'Eigenheime',
          value: '200000',
        },
        {
          id: uuidv4(),
          cat: 'passiva',
          type: 'verbind',
          name: 'Eigengenutzte Immobilien',
          value: '150000',
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
      if (value.type === filter) {
        return true;
      }
      return false;
    },
    calcTypeSum(type) {
      let typeSum = 0;
      const filteredData = this.pbsdata.filter((filter) => filter.type === type);
      filteredData.forEach((t) => {
        typeSum += (parseFloat(t.value));
      });
      // Add category sum to array to avoid recalculations
      const index = this.types.findIndex(({ value }) => value === type);
      this.types[index].sum = typeSum;
      return this.formatCurrency(typeSum);
    },
  },
  watch: {
    formData() {
      if (this.formData.cmd === 'delete') {
        // Remove All
        const result = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
        }).formatToParts(100);
        console.log(result);
        this.pbsdata = [];
      } else {
        // Add form data to array
        this.pbsdata.push(this.formData);
      }
    },
  },
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

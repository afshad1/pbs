<template>
  <div>
    <b-container fluid>
      <b-row>
        <!-- For each category in cats -->
        <b-col v-for="k in cats" :key="k.value">
          <!-- Header for Aktiva/Passiva -->
          <div class="px-1 bg-info text-light">
            <b>{{ k.text }}</b>
          </div>
          <div v-for="type in types" :key="type.value">
            <!-- TODO: Select row parameters for b-table
            selectable
            select-mode="single"
            @row-selected="onRowSelected" -->
            <b-table
            outlined striped small
            :fields="fields"
            :items="pbsdata"
            v-if="type.cat === k.value"
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

            <!-- Display calculated sum of Value in header -->
            <template v-slot:head(value)>
              {{ calcTypeSum( type.value ) }}
            </template>

            <!-- TODO: Display input on row selected -->
            <!-- <template v-slot:cell(value)="data">
              <template v-if="true">
                <b-input></b-input>
              </template>
              <template v-else>
              {{ data.item.value }}
              </template>
            </template> -->

            <!-- Display delete button in cells -->
            <template v-slot:cell(delete)="data">
                <b-link @click="deleteAktiva(data.item)">
                <b-icon-trash-fill font-scale="1.5"></b-icon-trash-fill>
                </b-link>
            </template>

            </b-table>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="k in cats" :key="k.value">

          <div class="px-1 bg-info text-light">
            <b>Summe {{ k.text }}</b><span class="float-right">{{ calcCatSum(k.value) }}</span>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import { v4 as uuidv4 } from 'uuid';
import { BIconTrashFill } from 'bootstrap-vue';

export default {
  components: {
    BIconTrashFill,
  },
  name: 'PBSTable',
  props: {
    formData: {
      type: Array,
    },
  },
  data() {
    return {
      STORAGE_KEY: 'pbsStorage', // localStorage key
      // TODO: Exlude cats/types from here and fetch from App.vue
      cats: [
        { text: 'Aktiva', value: 'aktiva' },
        { text: 'Passiva', value: 'passiva' },
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
      pbsdata: [],
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
    calcCatSum(cat) {
      let catSum = 0;
      const filteredData = this.pbsdata.filter((filter) => filter.cat === cat);
      filteredData.forEach((t) => {
        catSum += (parseFloat(t.value));
      });
      // Add category sum to array to avoid recalculations
      const index = this.cats.findIndex(({ value }) => value === cat);
      this.cats[index].sum = catSum;
      return this.formatCurrency(catSum);
    },
    formatMe(val) {
      return this.formatCurrency(val);
    },
    // On select row event
    // onRowSelected(items) {
    //   console.log(items);
    // },
  },
  watch: {
    formData() {
      if (this.formData[0].cmd === 'delete') {
        // Remove All
        this.pbsdata = [];
      } else {
        // Add each object in array
        this.formData.forEach((f) => this.pbsdata.push(f));
      }
    },
    pbsdata: {
      // Save in localStorage on changes in pbsdata
      handler(pbsdata) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pbsdata));
      },
      deep: true,
    },
  },
  mounted() {
    // Load from localStorage in browser
    if (localStorage.getItem(this.STORAGE_KEY)) {
      this.pbsdata = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || []);
    }
  },
  computed: {
    // TODO: Get unique values of types and pass to ForEach of b-table.
    // Goal is that tables are not shown if there are no items with a type

    // typesInPbsdata() {
    //   // const uniqueValues = [...new Set(this.pbsdata.map((x) => x.type))];
    //   // const uniqueValues = Array.from(new Set(this.pbsdata.map((item) => item.type)));
    //   const unique = [];
    //   const distinct = [];
    //   for (let i = 0; i < this.pbsdata.length; i += 1) {
    //     if (!unique[this.pbsdata[i].type]) {
    //       const uniqueVal = { type: this.pbsdata[i].type, cat: this.pbsdata[i].cat };
    //       // distinct.push(this.pbsdata[i].type);
    //       // distinct.push(this.pbsdata[i].cat);
    //       distinct.push(uniqueVal);

    //       unique[this.pbsdata[i].type] = 1;
    //     }
    //   }
    //   // console.log(distinct);
    //   return distinct;
    // },
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

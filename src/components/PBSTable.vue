<template>
  <div>
    <b-container fluid>
      <b-row>
        <!-- For each category in cats -->
        <b-col v-for="k in cats" :key="k.value">
          <!-- Header for Aktiva/Passiva -->
          <div class="px-1 bg-info text-light rounded-top">
            <b>{{ k.text }}</b>
          </div>
          <div v-for="type in types" :key="type.value">
            <b-table
              outlined
              small
              fixed
              stacked="sm"
              :fields="fields"
              :items="pbsData"
              v-if="type.cat === k.value"
              :filter="type.value"
              :filter-function="filterPbs"
              head-row-variant="info"
            >
              <!-- Display Type as Name in header -->
              <template v-slot:head(name)>
                <div class>{{ type.text }}</div>
              </template>

              <!-- Display calculated sum of Value in header -->
              <template v-slot:head(value)>{{ calcTypeSum( type.value ) }}</template>

              <!-- Display delete button in cells -->
              <template v-slot:cell(delete)="data">
                <b-link @click="deletePbsData(data.item)">
                  <b-icon-trash-fill font-scale="1.5"></b-icon-trash-fill>
                </b-link>
              </template>
            </b-table>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="k in cats" :key="k.value">
          <div
            class="px-1 bg-info text-light d-flex flex-row justify-content-between rounded-bottom"
          >
            <div class="d-flex">
              <b>Summe {{ k.text }}</b>
            </div>
            <div class="d-flex inline">{{ calcCatSum(k.value) }}</div>
            <div class="d-flex inline"></div>
          </div>
        </b-col>
      </b-row>
      <!-- <b-button class="float-left" type="button" @click="debugInfo" variant="info">
        Debug
      </b-button>-->
    </b-container>
  </div>
</template>

<script>
import { getters, actions, mutations } from "@/pbsStore";
export default {
  components: {
  },
  name: "PBSTable",
  data() {
    return {
      loaded: false,
      fields: [
        { key: "name", label: "Name" },
        {
          key: "percent",
          label: "100%",
          formatter: (val, key, item) => {
            // Get pre-calculated sum value of category to avoid recalculation on each call
            const index = this.types.findIndex(
              ({ value }) => value === item.type
            );
            const result = ((item.value / this.types[index].sum) * 100)
              .toFixed(2)
              .concat("%");
            return result;
          }
        },
        {
          key: "value",
          label: "Value",
          formatter: item => {
            const result = this.formatCurrency(item);
            return result;
          }
        },
        { key: "delete", label: "Löschen" }
      ]
    };
  },
  methods: {
    debugInfo() {
      // console.log(this.pbsData[0].value);
    },
    filterPbs(value, filter) {
      if (value.type === filter) {
        return true;
      }
      return false;
    },
    calcTypeSum(type) {
      let typeSum = 0;
      const filteredData = this.pbsData.filter(filter => filter.type === type);
      filteredData.forEach(t => {
        typeSum += parseFloat(t.value);
      });
      // Add category sum to array to avoid recalculations
      const index = this.types.findIndex(({ value }) => value === type);
      this.types[index].sum = typeSum;
      return this.formatCurrency(typeSum);
    },
    calcCatSum(cat) {
      let catSum = 0;
      const filteredData = this.pbsData.filter(filter => filter.cat === cat);
      filteredData.forEach(t => {
        catSum += parseFloat(t.value);
      });
      // Add category sum to array to avoid recalculations
      const index = this.cats.findIndex(({ value }) => value === cat);
      this.cats[index].sum = catSum;
      return this.formatCurrency(catSum);
    },
    ...mutations,
    ...actions
  },
  computed: {
    //  setting computed variable from getter in pbsStore
    ...getters // including all getters from pbsStore e.g. pbsData()
  },
  created() {
    // fetching data from pbsStore at creation
    actions.fetchDataFromLocalStorage();
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

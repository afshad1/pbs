<template>
<div>
  <template v-for="c in cats">
    <b-container class="mt-2" :key="c.value">
      <b-row class="border-dark bg-info text-white font-weight-bold rounded-top">
        <b-col>{{ c.text }}</b-col>
      </b-row>
      <b-row>
        <!-- Aktiva/Passiva Card -->
        <b-col class="mb-1 shadow border-dark rounded">
          <!-- Single cards -->
          <b-card-group deck class="p-1">
            <b-card
            v-for="p in pbsDataFilter('cat', c.value)"
            :key="p.id"
            class="m-1"
            style="max-width: 14rem; min-width: 12rem"
            :title="p.name"
            :sub-title="getTypeText(p.type)"
            :footer="formatCurrency(p.value)"
            @click="modalShow = !modalShow"
            > 
            <b-card-body><a href="#" class="stretched-link"></a></b-card-body>
            </b-card>
            <b-modal v-model="modalShow" >Todo</b-modal>
        </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </template>


</div>
</template>

<script>
import { getters, actions, mutations } from "@/pbsStore";

export default {
  name: "PBSCards",
  data() {
    return {
      modalShow: false
    };
  },
  methods: {
    testMethod() {
      // console.log(this.pbsdata);
    },
    getCardDesign(val) {
      const objectLiteral = {
        liq: "info",
        immo: "success",
        verbind: "danger"
      };
      return objectLiteral[val];
    },
    filterPbs(value, filter) {
      if (value.type === filter) {
        return false;
      }
      return false;
    },
    ...mutations
  },
  computed: {
    ...getters
  },
  created() {
    // fetching data from pbsStore at creation
    actions.fetchDataFromLocalStorage();
  }
};
</script>

<style scoped>
</style>

<template>
  <div class="shadow p-3 mb-5 bg-white rounded">
    <b-card-group deck>
      <template v-for="p in pbsData">
        <b-card
          :key="p.id"
          :header="getTypeText(p.type)"
          :header-bg-variant="getCardDesign(p.type)"
          header-text-variant="white"
          :title="p.name"
          style="max-width: 15rem; min-width: 15rem;"
          class="mb-2"
        >
          <b-card-text>{{ formatCurrency(p.value) }}</b-card-text>

          <!-- <b-button href="#" variant="primary" @click="testMethod()">Go somewhere</b-button> -->
          <b-link>
            <b-icon-trash-fill font-scale="1.5" @click="deletePbsData(p)"></b-icon-trash-fill>
          </b-link>
        </b-card>
      </template>
    </b-card-group>
  </div>
</template>

<script>
import { getters, actions, mutations } from "@/pbsStore";

export default {
  name: "PBSCards",
  data() {
    return {};
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

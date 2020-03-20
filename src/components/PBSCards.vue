<template>
    <div>
  <b-card-group deck>
    <template v-for="p in pbsData">
  <b-card
    :key="p.id"
    header="getTypeText(p.type)"
    :header-bg-variant="getCardDesign(p.type)"
    header-text-variant="white"
    :title="p.name"
    style="max-width: 15rem; min-width: 12rem;"
    class="mb-2"
  >
    <b-card-text>
      {{ formatCurrency(p.value) }}
    </b-card-text>

    <!-- <b-button href="#" variant="primary" @click="testMethod()">Go somewhere</b-button> -->
    <b-link>
      <b-icon-trash-fill font-scale="1.5"></b-icon-trash-fill>
    </b-link>
  </b-card>
    </template>
  </b-card-group>
</div>
</template>

<script>
import {
  getters,
  actions,
} from '@/pbsStore';

export default {
  name: 'PBSCards',
  data() {
    return {
    };
  },
  methods: {
    testMethod() {
      // console.log(this.pbsdata);
    },
    // getTypeText(type) {
    //   return getters.getTypeText(type);
    // },
    getCardDesign(val) {
      const objectLiteral = {
        liq: 'info',
        immo: '',
        verbind: '',
      };
      return objectLiteral[val];
    },
  },
  computed: {
    pbsData() {
      return getters.pbsData();
    },
    ...getters,
  },
  created() {
    // fetching data from pbsStore at creation
    actions.fetchDataFromLocalStorage();
  },
};
</script>

<style scoped>

</style>

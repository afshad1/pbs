<template>
    <div>
  <b-card-group deck>
    <template v-for="p in pbsdata">
  <b-card
    :key="p.id"
    :header="getTypeText(p.type)"
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
import { pbsStore } from '@/pbsStore';

export default {
  name: 'PBSCards',
  data() {
    return {
      pbsdata: pbsStore.dataLocalStorage(),
    };
  },
  methods: {
    testMethod() {
      // console.log(this.pbsdata);
    },
    getTypeText(type) {
      return pbsStore.getTypeText(type);
    },
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
    pbsDataLocalStorage() {
      return pbsStore.dataLocalStorage();
    },
  },
};
</script>

<style scoped>

</style>

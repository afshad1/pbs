<template>
    <div>
  <b-card-group deck>
  <b-card
    title="this.pbsdata[0].name"
    sub-title="aktiva"
    style="max-width: 15rem;"
    class="mb-2"
  >
    <b-card-text>
      <!-- {{ this.pbsdata[0].type }} -->liquide
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
  <b-card
    title="Immobilien"
    sub-title="aktiva"
    style="max-width: 15rem;"
    class="mb-2"
  >
    <b-card-text>
      <!-- {{ this.pbsdata[1].type }} -->
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>

  </b-card-group>
</div>
</template>

<script>
// import { pbsStore, mutations } from '@/pbsStore';

export default {
  name: 'PBSCards',
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {

  },
};
</script>

<style scoped>

</style>

<template>
  <div id="app">
    <b-navbar type="dark" variant="info">
    <b-navbar-brand href="#">Private Bilanzerstellung</b-navbar-brand>
    <b-form-checkbox v-model="cardView" switch class="mr-n2" @change="changeView">
        <span class="sr-only">Switch for following text input</span>
      </b-form-checkbox>
    </b-navbar>

    <PBSForm />
    <router-view />
        <PBSChart :width="300" :height="300"/>

  </div>
</template>

<script>
import PBSForm from './components/PBSForm.vue';
import PBSChart from './components/PBSChart.vue';

export default {
  name: 'App',
  components: {
    PBSForm,
    PBSChart
  },
  data() {
    return {
      cardView: false,
    };
  },
  methods: {
    changeView() {
      if (!this.cardView) {
        this.$router.push('/cards');
      } else {
        this.$router.push({ name: 'PBSTable'});
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

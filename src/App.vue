<template>
  <div id="app">
    <b-navbar type="dark" variant="info">
    <b-navbar-brand href="#">Private Bilanzerstellung</b-navbar-brand>
    <b-form-checkbox v-model="cardView" switch class="mr-n2">
        <span class="sr-only">Switch for following text input</span>
      </b-form-checkbox>
    </b-navbar>

    <PBSForm v-show="!cardView"/>

    <PBSTable v-show="!cardView"/>

    <PBSCards v-show="cardView"/>

  </div>
</template>

<script>
import PBSForm from './components/PBSForm.vue';
import PBSTable from './components/PBSTable.vue';
import PBSCards from './components/PBSCards.vue';

export default {
  name: 'App',
  components: {
    PBSForm,
    PBSTable,
    PBSCards,
  },
  data() {
    return {
      cardView: false,
    };
  },
  methods: {

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

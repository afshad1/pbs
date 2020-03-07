<template>
  <div id="app">
    <b-navbar type="dark" variant="info">
    <b-navbar-brand href="#">Private Bilanzerstellung</b-navbar-brand>
    </b-navbar>
    <br>
    <!-- <PBSForm /> -->
    <!-- <br> -->
    <PBSTable />
  </div>
</template>

<script>
// import PBSForm from './components/PBSForm.vue';
import PBSTable from './components/PBSTable.vue';

export default {
  name: 'App',
  components: {
    // PBSForm,
    PBSTable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

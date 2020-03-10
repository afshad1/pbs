<template>
  <div id="app">
    <b-navbar type="dark" variant="info">
    <b-navbar-brand href="#">Private Bilanzerstellung</b-navbar-brand>
    </b-navbar>
    <br>
    <PBSForm @inputData="newFormData"/>
    <!-- <br> -->
    <PBSTable :formData="newformData"/>
  </div>
</template>

<script>
import PBSForm from './components/PBSForm.vue';
import PBSTable from './components/PBSTable.vue';

export default {
  name: 'App',
  components: {
    PBSForm,
    PBSTable,
  },
  data() {
    return {
      newformData: {},
    };
  },
  methods: {
    newFormData(data) {
      this.newformData = data;
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

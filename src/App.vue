<template>
  <div id="app">
    <b-navbar type="dark" variant="info">
    <b-navbar-brand href="#">Private Bilanzerstellung</b-navbar-brand>
    <b-form-checkbox v-model="switch1" switch class="mr-n2">
        <span class="sr-only">Switch for following text input</span>
      </b-form-checkbox>
    </b-navbar>

    <PBSForm @inputData="updateFormData" v-show="!switch1"/>

    <PBSTable :formData="formData" v-show="!switch1"/>
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
      switch1: true,
      formData: [],
    };
  },
  methods: {
    updateFormData(data) {
      this.formData = data;
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

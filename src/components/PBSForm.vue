<template>
  <div>
    <b-card bg-variant="light">
     <b-form @reset="onReset" @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-select
          id="input-1"
          v-model="form.types"
          :options="types"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          v-model="form.name"
          required
          placeholder="Name z.B. Girokonten"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label-for="input-3">
        <b-form-input
          id="input-3"
          type="number"
          v-model="form.value"
          placeholder="Wert"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Hinzufügen</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>

    </b-form>
    </b-card>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      form: {
        types: 'liq',
        name: '',
        value: '',
      },
      types: [
        {
          label: 'Aktiva',
          options: [
            { value: 'liq', text: 'Liquides Vermögen' },
            { value: 'immo', text: 'Immobilien' },
          ],
        },
        {
          label: 'Passiva',
          options: [
            { value: 'verbind', text: 'Verbindlichkeiten' },
          ],
        },
      ],
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const newEntry = this.createEntry();
      this.$emit('inputData', newEntry);
      this.clearForm();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      // this.form.types = '';
      this.form.name = '';
      this.form.value = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    createEntry() {
      const newEntry = {
        id: uuidv4(),
        type: this.form.types,
        name: this.form.name,
        value: this.form.value,
      };
      return newEntry;
    },
    clearForm() {
      // this.form.types = '';
      this.form.name = '';
      this.form.value = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

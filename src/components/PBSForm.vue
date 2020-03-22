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
          label-cols="2"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label-for="input-3">
        <b-input-group>
            <b-input-group-text slot="prepend">
              {{ this.getCurrencySymbol() }}</b-input-group-text>
          <b-form-input
            id="input-3"
            type="number"
            v-model="form.value"
            placeholder="Wert"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Hinzufügen</b-button>
      <b-button type="reset" variant="secondary">Reset</b-button>

      <b-button class="float-right" type="button" @click="onDelete" variant="danger">
        Alle Einträge löschen
      </b-button>

      <b-button class="float-right" type="button" @click="generateSample" variant="info">
        Beispiel-Einträge erstellen
      </b-button>

    </b-form>
    </b-card>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mutations } from '@/pbsStore';

export default {
  data() {
    return {
      form: {
        types: { key: 'liq', cat: 'aktiva' },
        name: '',
        value: '',
      },
      types: [
        {
          label: 'Aktiva',
          options: [
            { value: { key: 'liq', cat: 'aktiva' }, text: 'Liquides Vermögen' },
            { value: { key: 'immo', cat: 'aktiva' }, text: 'Immobilien' },
          ],
        },
        {
          label: 'Passiva',
          options: [
            { value: { key: 'verbind', cat: 'passiva' }, text: 'Verbindlichkeiten' },
            { value: { key: 'eigenkapital', cat: 'passiva' }, text: 'Eigenkapital' },
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
      mutations.addPbsData(newEntry);
      this.clearForm();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.name = '';
      this.form.value = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onDelete() {
      mutations.deletePbsAll();
    },
    createEntry() {
      const newEntry = [{
        id: uuidv4(),
        cat: this.form.types.cat,
        type: this.form.types.key,
        name: this.form.name,
        value: this.form.value,
      }];
      return newEntry;
    },
    clearForm() {
      this.form.name = '';
      this.form.value = '';
    },
    generateSample() {
      const sample = [
        {
          id: uuidv4(),
          cat: 'aktiva',
          type: 'liq',
          name: 'Girokonten',
          value: '10000',
        },
        {
          id: uuidv4(),
          cat: 'aktiva',
          type: 'liq',
          name: 'Festgelder',
          value: '5000',
        },
        {
          id: uuidv4(),
          cat: 'aktiva',
          type: 'liq',
          name: 'Sparbücher',
          value: '3000',
        },
        {
          id: uuidv4(),
          cat: 'aktiva',
          type: 'immo',
          name: 'Eigenheime',
          value: '200000',
        },
        {
          id: uuidv4(),
          cat: 'passiva',
          type: 'verbind',
          name: 'Eigengenutzte Immobilien',
          value: '150000',
        },
        {
          id: uuidv4(),
          cat: 'passiva',
          type: 'verbind',
          name: 'Darlehen',
          value: '20000',
        },
        {
          id: uuidv4(),
          cat: 'passiva',
          type: 'eigenkapital',
          name: 'Eigenkapital',
          value: '48000',
        },
      ];
      mutations.addPbsData(sample);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

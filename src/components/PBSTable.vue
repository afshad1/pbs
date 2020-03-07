<template>
  <div>
    <b-form @reset="onReset" @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-select
          id="input-1"
          v-model="form.aktiva_kat"
          :options="aktiva_kats"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          v-model="form.type"
          required
          placeholder="Typ z.B. Girokonten"
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
    <!-- TODO Iteration der Tabellen verbessern -->
    <div v-for="v in aktiva_kats" :key="v.value">
      <b-table :filter="v.value"
      outlined :fields="fields" :items="pbsdata" head-variant="light">
      <!-- Display name Type -->
      <template v-slot:head(type)>
        {{ v.text }}
      </template>

      <!-- Display calculated sum of Value -->
      <template v-slot:head(value)>
        {{ liquidSum }}
      </template>

      <!-- Show Type in Bold -->
      <template v-slot:cell(type)="data">
        <b>{{ data.value }}</b>
      </template>

      <!-- Display delete button -->
      <template v-slot:cell(delete)="data">
        <b-button @click="deleteAktiva(data.value)">X</b-button>
      </template>

      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        aktiva_kat: 'liq',
        type: '',
        value: '',
      },
      aktiva_kats: [{ text: 'Liquides Vermögen / Bargeld', value: 'liq' }, { text: 'Immobilien', value: 'immo' }],
      show: true,
      fields: [
        { key: 'type', label: 'Type' },
        {
          key: 'percent',
          label: '100%',
          formatter: (value, key, item) => {
            const result = ((item.value / this.liquidSum) * 100).toFixed(2).concat('%');
            return result;
          },
        },
        { key: 'value', label: 'Value' },
        { key: 'delete', label: 'Löschen' },
      ],
      pbsdata: [
        {
          kat: 'liq',
          type: 'Girokonten',
          value: '100000',
        },
        {
          kat: 'liq',
          type: 'Festfelder',
          value: '100000',
        },
        {
          kat: 'liq',
          type: 'Sparbücher',
          value: '100000',
        },
        {
          kat: 'immo',
          type: 'Eigenheime',
          value: '200000',
        },
      ],
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form));
      this.addAktiva();
      this.clearForm();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.aktiva_kat = 'liq';
      this.form.type = '';
      this.form.value = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    addAktiva() {
      const newEntry = {
        aktiva_kat: this.form.aktiva_kat,
        type: this.form.type,
        value: this.form.value,
      };
      this.pbsdata.push(newEntry);
    },
    clearForm() {
      this.form.aktiva_kat = 'liq';
      this.form.type = '';
      this.form.value = '';
    },
    deleteAktiva(index) {
      console.log(index);
      // alert(JSON.stringify(data));
      this.pbsdata.splice(index, 1);
    },
  },
  computed: {
    liquidSum() {
      let liquidSum = 0;
      this.pbsdata.forEach((liq) => {
        liquidSum += (parseFloat(liq.value));
      });
      return liquidSum;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

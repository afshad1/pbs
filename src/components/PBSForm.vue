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
          v-model="form.aktiva_type"
          required
          placeholder="Typ z.B. Girokonten"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label-for="input-3">
        <b-form-input
          id="input-3"
          type="number"
          v-model="form.aktiva_value"
          placeholder="Wert"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Hinzufügen</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>


    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        aktiva_kat: 'liq',
        aktiva_type: '',
        aktiva_value: '',
      },
      aktiva_kats: [{ text: 'Liquides Vermögen / Bargeld', value: 'liq' }, { text: 'Immobilien', value: 'immo' }],
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
      this.aktiva_kats.push([{ text: 'yes', value: 'no' }]);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.aktiva_kat = 'liq';
      this.form.aktiva_type = '';
      this.form.aktiva_value = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

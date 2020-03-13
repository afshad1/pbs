import Vue from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const pbsStore = Vue.observable({
  data: [
    {
      id: uuidv4(),
      cat: 'aktiva',
      type: 'liq',
      name: 'Custom Data Giro',
      value: '100000',
    },
    {
      id: uuidv4(),
      cat: 'aktiva',
      type: 'liq',
      name: 'Festgelder',
      value: '100000',
    },
    {
      id: uuidv4(),
      cat: 'aktiva',
      type: 'liq',
      name: 'Sparbücher',
      value: '100000',
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
  ],
  dataLocal() {
    if (localStorage.getItem('pbsStorage')) {
      return JSON.parse(localStorage.getItem('pbsStorage') || []);
    }
    return [];
  },
});

export const mutations = {
  setPbsData(data) {
    localStorage.setItem('pbsStorage', JSON.stringify(data));
  },
  addPbsData(data) {
    data.forEach((p) => pbsStore.data.push(p));
  },
  deletePbsData(item) {
    const { id } = item;
    const index = pbsStore.data.map((x) => x.id).indexOf(id);
    pbsStore.data.splice(index, 1);
  },
  deletePbsAll() {
    pbsStore.data = [];
  },
};

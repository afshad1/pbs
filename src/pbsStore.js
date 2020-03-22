import Vue from 'vue';
// import { v4 as uuidv4 } from 'uuid';

export const pbsStore = Vue.observable({
  STORAGE_KEY: 'pbsStorage',
  cats: [
    { text: 'Aktiva', value: 'aktiva' },
    { text: 'Passiva', value: 'passiva' },
  ],
  types: [
    { text: 'Liquides Vermögen', value: 'liq', cat: 'aktiva' },
    { text: 'Immobilien', value: 'immo', cat: 'aktiva' },
    { text: 'Verbindlichkeiten', value: 'verbind', cat: 'passiva' },
    { text: 'Eigenkapital', value: 'eigenkapital', cat: 'passiva' },
  ],
  data: [
    // {
    //   id: uuidv4(),
    //   cat: 'aktiva',
    //   type: 'liq',
    //   name: 'Custom Data Giro',
    //   value: '100000',
    // },
    // {
    //   id: uuidv4(),
    //   cat: 'aktiva',
    //   type: 'liq',
    //   name: 'Festgelder',
    //   value: '100000',
    // },
    // {
    //   id: uuidv4(),
    //   cat: 'aktiva',
    //   type: 'liq',
    //   name: 'Sparbücher',
    //   value: '100000',
    // },
    // {
    //   id: uuidv4(),
    //   cat: 'aktiva',
    //   type: 'immo',
    //   name: 'Eigenheime',
    //   value: '200000',
    // },
    // {
    //   id: uuidv4(),
    //   cat: 'passiva',
    //   type: 'verbind',
    //   name: 'Eigengenutzte Immobilien',
    //   value: '150000',
    // },
  ],
});

export const getters = {
  pbsData: () => pbsStore.data,
  pbsDataFilter: () => (attr, filter) => {
    return pbsStore.data.filter(function (el) {
      return el[attr] === filter;
    })
  },
  cats: () => pbsStore.cats,
  types: () => pbsStore.types,
  getTypeText: () => (type) => {
    const res = pbsStore.types.find((search) => search.value === type);
    return res.text;
  },
  getChartValues: () => () => {
    let catData = pbsStore.data.filter(function (el) {
      return el['cat'] === 'aktiva';
    });
    // let catData = getters.pbsDataFilter('cat', 'aktiva');
    const catValues = catData.map((x) => parseInt(x.value))
    return catValues;
  },
};

export const mutations = {
  // set data to single point of truth and localStorage
  setData(data) {
    pbsStore.data = data;
    localStorage.setItem(pbsStore.STORAGE_KEY, JSON.stringify(data));
  },
  // add form data (array) to pbsStore.data and set localStorage
  addPbsData(data) {
    data.forEach((p) => pbsStore.data.push(p));
    this.setData(pbsStore.data);
  },
  deletePbsData(item) {
    // delete pbs data and set localStorage
    const { id } = item;
    const index = pbsStore.data.map((x) => x.id).indexOf(id);
    pbsStore.data.splice(index, 1);
    this.setData(pbsStore.data);
  },
  deletePbsAll() {
    // delete all pbs data
    pbsStore.data.splice(0, pbsStore.data.length);
    this.setData(pbsStore.data);
  },
};

export const actions = {
  fetchDataFromLocalStorage() {
    let res = [];
    if (localStorage.getItem(pbsStore.STORAGE_KEY)) {
      res = JSON.parse(localStorage.getItem(pbsStore.STORAGE_KEY) || []);
    }
    return mutations.setData(res);
  },
};

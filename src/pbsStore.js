import Vue from 'vue';
// import { v4 as uuidv4 } from 'uuid';

export const pbsStore = Vue.observable({
  STORAGE_KEY: 'pbsStorage',
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
  getTypeText(type) {
    const objectLiteral = {
      liq: 'Liquides Vermögen',
      immo: 'Immobilien',
      verbind: 'Verbindlichkeiten',
    };
    // const res = allTypes.type;
    return objectLiteral[type];
  },
};

export const mutations = {
  // set data to single point of truth and localStorage
  setData(data) {
    pbsStore.data = data;
    localStorage.setItem(pbsStore.STORAGE_KEY, JSON.stringify(data));
  },

  // set data to localStorage
  setPbsData(data) {
    localStorage.setItem(pbsStore.STORAGE_KEY, JSON.stringify(data));
  },
  // add form data (array) to pbsStore.data and set localStorage
  addPbsData(data) {
    data.forEach((p) => pbsStore.data.push(p));
    this.setPbsData(pbsStore.data);
  },
  deletePbsData(item) {
    // delete pbs data and set localStorage
    const { id } = item;
    const index = pbsStore.data.map((x) => x.id).indexOf(id);
    pbsStore.data.splice(index, 1);
    this.setData(pbsStore.data);
    // this.setPbsData(pbsStore.data);
  },
  deletePbsAll() {
    // delete all pbs data
    pbsStore.data.splice(0, pbsStore.data.length);
    this.setPbsData(pbsStore.data);
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

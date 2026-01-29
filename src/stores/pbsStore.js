import { defineStore } from 'pinia';

const STORAGE_KEY = 'pbsStorage';

const defaultCategories = [
  { text: 'Aktiva', value: 'aktiva' },
  { text: 'Passiva', value: 'passiva' },
];

const defaultTypes = [
  { text: 'Liquides Vermögen', value: 'liq', cat: 'aktiva' },
  { text: 'Immobilien', value: 'immo', cat: 'aktiva' },
  { text: 'Verbindlichkeiten', value: 'verbind', cat: 'passiva' },
  { text: 'Eigenkapital', value: 'eigenkapital', cat: 'passiva' },
];

const normalizeNumber = (value) => {
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const createId = () => (
  globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
);

const emptyEntry = () => ({
  id: createId(),
  cat: 'aktiva',
  type: 'liq',
  name: '',
  value: '',
});

export const usePbsStore = defineStore('pbs', {
  state: () => ({
    entries: [],
    categories: defaultCategories,
    types: defaultTypes,
    draft: emptyEntry(),
  }),
  getters: {
    entriesByCat: (state) => (cat) => state.entries.filter((entry) => entry.cat === cat),
    entriesByType: (state) => (type) => state.entries.filter((entry) => entry.type === type),
    typeLabel: (state) => (type) => state.types.find((item) => item.value === type)?.text || '',
    catLabel: (state) => (cat) => state.categories.find((item) => item.value === cat)?.text || '',
    totalByCat: (state) => (cat) => state.entries
      .filter((entry) => entry.cat === cat)
      .reduce((sum, entry) => sum + normalizeNumber(entry.value), 0),
    totalByType: (state) => (type) => state.entries
      .filter((entry) => entry.type === type)
      .reduce((sum, entry) => sum + normalizeNumber(entry.value), 0),
    totalAktiva() {
      return this.totalByCat('aktiva');
    },
    totalPassiva() {
      return this.totalByCat('passiva');
    },
    netWorth() {
      return this.totalAktiva - this.totalPassiva;
    },
  },
  actions: {
    hydrate() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            this.entries = parsed;
          }
        } catch (error) {
          // Ignore corrupt storage and start fresh.
        }
      }
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
    },
    resetDraft() {
      this.draft = emptyEntry();
    },
    addEntry() {
      const cleaned = {
        id: createId(),
        cat: this.draft.cat,
        type: this.draft.type,
        name: this.draft.name.trim(),
        value: this.draft.value,
      };
      if (!cleaned.name || cleaned.value === '') return;
      this.entries.push(cleaned);
      this.persist();
      this.resetDraft();
    },
    removeEntry(entryId) {
      this.entries = this.entries.filter((entry) => entry.id !== entryId);
      this.persist();
    },
    clearAll() {
      this.entries = [];
      this.persist();
    },
    seedSample() {
      this.entries = [
        { id: createId(), cat: 'aktiva', type: 'liq', name: 'Girokonten', value: '10000' },
        { id: createId(), cat: 'aktiva', type: 'liq', name: 'Festgelder', value: '5000' },
        { id: createId(), cat: 'aktiva', type: 'liq', name: 'Sparbücher', value: '3000' },
        { id: createId(), cat: 'aktiva', type: 'immo', name: 'Eigenheime', value: '200000' },
        { id: createId(), cat: 'passiva', type: 'verbind', name: 'Eigengenutzte Immobilien', value: '150000' },
        { id: createId(), cat: 'passiva', type: 'verbind', name: 'Darlehen', value: '20000' },
        { id: createId(), cat: 'passiva', type: 'eigenkapital', name: 'Eigenkapital', value: '48000' },
      ];
      this.persist();
    },
  },
});

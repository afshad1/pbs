<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <div class="flex flex-wrap items-center justify-between gap-6">
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-[0.3em] text-emerald-300">
              Private Bilanzerstellung
            </p>
            <h1 class="font-display text-3xl font-semibold sm:text-4xl">
              Private Balance Sheet
            </h1>
            <p class="max-w-xl text-sm text-slate-300 sm:text-base">
              Halte Vermögenswerte und Verbindlichkeiten im Blick, inklusive Summen,
              Verhältnissen und einem klaren Überblick.
            </p>
          </div>
          <div class="flex items-center gap-2 rounded-full bg-white/10 p-1 text-sm">
            <button
              class="rounded-full px-4 py-2 font-medium transition"
              :class="viewMode === 'table' ? 'bg-white text-slate-900' : 'text-slate-200 hover:text-white'"
              @click="setView('table')"
            >
              Tabelle
            </button>
            <button
              class="rounded-full px-4 py-2 font-medium transition"
              :class="viewMode === 'cards' ? 'bg-white text-slate-900' : 'text-slate-200 hover:text-white'"
              @click="setView('cards')"
            >
              Karten
            </button>
          </div>
        </div>
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p class="text-xs uppercase tracking-wide text-slate-300">Aktiva</p>
            <p class="mt-2 text-2xl font-semibold">{{ formatCurrency(store.totalAktiva) }}</p>
            <p class="mt-1 text-xs text-emerald-200">Summe aller Vermögenswerte</p>
          </div>
          <div class="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p class="text-xs uppercase tracking-wide text-slate-300">Passiva</p>
            <p class="mt-2 text-2xl font-semibold">{{ formatCurrency(store.totalPassiva) }}</p>
            <p class="mt-1 text-xs text-rose-200">Summe aller Verbindlichkeiten</p>
          </div>
          <div class="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p class="text-xs uppercase tracking-wide text-slate-300">Netto</p>
            <p class="mt-2 text-2xl font-semibold">{{ formatCurrency(store.netWorth) }}</p>
            <p class="mt-1 text-xs text-slate-200">Aktiva minus Passiva</p>
          </div>
        </div>
      </div>
    </header>

    <main class="-mt-10 pb-16">
      <div class="mx-auto grid w-full max-w-6xl gap-6 px-6 lg:grid-cols-[2fr,1fr]">
        <section class="rounded-3xl bg-white p-6 shadow-soft">
          <PBSForm />
          <router-view class="mt-8" />
        </section>
        <aside class="rounded-3xl bg-white p-6 shadow-soft">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-wide text-slate-400">Visualisierung</p>
              <h2 class="text-lg font-semibold">Aktiva-Verteilung</h2>
            </div>
          </div>
          <PBSChart class="mt-6" />
          <div class="mt-8 space-y-3 text-sm text-slate-600">
            <div class="flex items-center justify-between">
              <span>Einträge gesamt</span>
              <span class="font-semibold text-slate-900">{{ store.entries.length }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Aktiva</span>
              <span class="font-semibold text-slate-900">{{ store.entriesByCat('aktiva').length }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Passiva</span>
              <span class="font-semibold text-slate-900">{{ store.entriesByCat('passiva').length }}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PBSForm from './components/PBSForm.vue';
import PBSChart from './components/PBSChart.vue';
import { usePbsStore } from './stores/pbsStore';
import { formatCurrency } from './utils/format';

const store = usePbsStore();
const route = useRoute();
const router = useRouter();

const viewMode = computed(() => (route.path === '/cards' ? 'cards' : 'table'));

const setView = (mode) => {
  router.push(mode === 'cards' ? '/cards' : '/');
};

onMounted(() => {
  store.hydrate();
});
</script>

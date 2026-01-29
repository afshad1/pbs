<template>
  <div class="space-y-8">
    <div
      v-for="cat in store.categories"
      :key="cat.value"
      class="space-y-4"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-slate-900">{{ cat.text }}</h3>
        <span class="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {{ formatCurrency(store.totalByCat(cat.value)) }}
        </span>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <article
          v-for="entry in store.entriesByCat(cat.value)"
          :key="entry.id"
          class="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs uppercase tracking-wide text-slate-400">
                {{ store.typeLabel(entry.type) }}
              </p>
              <h4 class="mt-1 text-base font-semibold text-slate-900">{{ entry.name }}</h4>
            </div>
            <button
              class="text-xs font-semibold text-rose-500 opacity-0 transition group-hover:opacity-100"
              @click="store.removeEntry(entry.id)"
            >
              Löschen
            </button>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-slate-500">Wert</span>
            <span class="text-lg font-semibold text-slate-900">
              {{ formatCurrency(entry.value) }}
            </span>
          </div>
        </article>
        <div
          v-if="store.entriesByCat(cat.value).length === 0"
          class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-400"
        >
          Noch keine Einträge vorhanden.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePbsStore } from '@/stores/pbsStore';
import { formatCurrency } from '@/utils/format';

const store = usePbsStore();
</script>

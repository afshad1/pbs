<template>
  <div class="space-y-8">
    <div
      v-for="group in groupedTypes"
      :key="group.cat.value"
      class="rounded-2xl border border-slate-100 bg-slate-50 p-4"
    >
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-400">Kategorie</p>
          <h3 class="text-lg font-semibold text-slate-900">{{ group.cat.text }}</h3>
        </div>
        <div class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
          {{ formatCurrency(store.totalByCat(group.cat.value)) }}
        </div>
      </div>

      <div class="mt-4 space-y-6">
        <div v-for="typeInfo in group.types" :key="typeInfo.type.value" class="space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="text-sm font-semibold text-slate-800">{{ typeInfo.type.text }}</p>
            <span class="text-sm font-semibold text-slate-700">
              {{ formatCurrency(typeInfo.total) }}
            </span>
          </div>

          <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-900 text-xs uppercase tracking-wide text-slate-100">
                <tr>
                  <th class="px-4 py-3 font-semibold">Name</th>
                  <th class="px-4 py-3 font-semibold">Anteil</th>
                  <th class="px-4 py-3 text-right font-semibold">Wert</th>
                  <th class="px-4 py-3 text-right font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="entry in typeInfo.entries"
                  :key="entry.id"
                  class="border-t border-slate-100"
                >
                  <td class="px-4 py-3 font-medium text-slate-800">{{ entry.name }}</td>
                  <td class="px-4 py-3 text-slate-500">
                    {{ formatPercent(typeInfo.total ? entry.value / typeInfo.total : 0) }}
                  </td>
                  <td class="px-4 py-3 text-right font-semibold text-slate-800">
                    {{ formatCurrency(entry.value) }}
                  </td>
                  <td class="px-4 py-3 text-right">
                    <button
                      class="text-xs font-semibold text-rose-500 transition hover:text-rose-700"
                      @click="store.removeEntry(entry.id)"
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
                <tr v-if="typeInfo.entries.length === 0" class="border-t border-slate-100">
                  <td class="px-4 py-4 text-sm text-slate-400" colspan="4">
                    Noch keine Einträge für diesen Typ.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePbsStore } from '@/stores/pbsStore';
import { formatCurrency, formatPercent } from '@/utils/format';

const store = usePbsStore();

const groupedTypes = computed(() => store.categories.map((cat) => ({
  cat,
  types: store.types
    .filter((type) => type.cat === cat.value)
    .map((type) => {
      const entries = store.entriesByType(type.value);
      const total = entries.reduce((sum, entry) => sum + Number(entry.value || 0), 0);
      return { type, entries, total };
    }),
})));
</script>

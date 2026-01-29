<template>
  <form class="space-y-6" @submit.prevent="store.addEntry">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="space-y-2">
        <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">Typ</span>
        <select
          v-model="store.draft.type"
          class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-900"
        >
          <option disabled value="">Bitte auswählen</option>
          <optgroup
            v-for="group in typeGroups"
            :key="group.label"
            :label="group.label"
          >
            <option v-for="option in group.options" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </optgroup>
        </select>
      </label>

      <label class="space-y-2 md:col-span-2">
        <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">Bezeichnung</span>
        <input
          v-model.trim="store.draft.name"
          type="text"
          placeholder="z. B. Girokonten"
          class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-900"
          required
        />
      </label>
    </div>

    <div class="grid items-end gap-4 md:grid-cols-3">
      <label class="space-y-2">
        <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">Wert</span>
        <div class="flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
          <span class="mr-2 text-slate-400">{{ currencySymbol() }}</span>
          <input
            v-model="store.draft.value"
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            class="w-full bg-transparent outline-none"
            required
          />
        </div>
      </label>

      <div class="flex flex-wrap gap-3 md:col-span-2 md:justify-end">
        <button
          type="button"
          class="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          @click="store.clearAll"
        >
          Alle Einträge löschen
        </button>
        <button
          type="button"
          class="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:border-emerald-300"
          @click="store.seedSample"
        >
          Beispiel-Einträge
        </button>
        <button
          type="submit"
          class="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Hinzufügen
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { computed, watch } from 'vue';
import { usePbsStore } from '@/stores/pbsStore';
import { currencySymbol } from '@/utils/format';

const store = usePbsStore();

const typeGroups = computed(() => store.categories.map((cat) => ({
  label: cat.text,
  options: store.types.filter((type) => type.cat === cat.value),
})));

watch(
  () => store.draft.type,
  (newType) => {
    const match = store.types.find((type) => type.value === newType);
    if (match) {
      store.draft.cat = match.cat;
    }
  },
  { immediate: true },
);
</script>

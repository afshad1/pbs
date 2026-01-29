<template>
  <div class="h-64">
    <Doughnut v-if="chartData.labels.length" :data="chartData" :options="options" />
    <div v-else class="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200">
      <p class="text-sm text-slate-400">Noch keine Aktiva-Daten für die Grafik.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { usePbsStore } from '@/stores/pbsStore';

ChartJS.register(ArcElement, Tooltip, Legend);

const store = usePbsStore();

const colors = [
  '#34d399',
  '#60a5fa',
  '#fbbf24',
  '#f87171',
  '#a78bfa',
  '#f97316',
];

const chartData = computed(() => {
  const entries = store.entriesByCat('aktiva');
  return {
    labels: entries.map((entry) => entry.name),
    datasets: [
      {
        data: entries.map((entry) => Number(entry.value || 0)),
        backgroundColor: entries.map((_, index) => colors[index % colors.length]),
        borderWidth: 0,
      },
    ],
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        label(context) {
          const label = context.label || '';
          const value = context.raw ?? 0;
          return `${label}: ${value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}`;
        },
      },
    },
  },
};
</script>

import { createRouter, createWebHistory } from 'vue-router';
import PBSTable from '@/components/PBSTable.vue';
import PBSCards from '@/components/PBSCards.vue';

const routes = [
  {
    path: '/',
    name: 'PBSTable',
    component: PBSTable,
  },
  {
    path: '/cards',
    name: 'PBSCards',
    component: PBSCards,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

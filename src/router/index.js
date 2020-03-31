import Vue from 'vue'
import Router from 'vue-router'
import PBSTable from '@/components/PBSTable'
import PBSCards from '@/components/PBSCards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PBSTable',
      component: PBSTable
    },
    {
        path: '/cards',
        name: 'PBSCards',
        component: PBSCards
    }
  ]
})
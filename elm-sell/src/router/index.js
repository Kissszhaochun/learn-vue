import Vue from 'vue'
import VueRouter from 'vue-router'
import Seller from '@/components/seller/seller.vue'
import Goods from '@/components/goods/goods.vue'
import Ratings from '@/components/ratings/ratings.vue'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource);

export default new VueRouter({
  linkActiveClass:'active',
  routes: [
    {
      path:'',
      redirect:'/goods'
    },
    {
      path:'/seller',
      component:Seller
    },
    {
      path:'/goods',
      component:Goods
    },
    {
      path:'/ratings',
      component:Ratings
    }
  ]
})

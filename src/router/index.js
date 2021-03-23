import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue';
import Orders from '../views/Orders.vue';
import OrdersDetails from '../views/OrdersDetails.vue';
import PickedOrder from '../views/PickedOrder.vue';
import PickedOrders from '../views/PickedOrders.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/orders',
    name: 'Orders',
    component : Orders
  },
  {
    path: '/orders/details/:id',
    name: 'OrdersDetails',
    component : OrdersDetails
  },
  {
    path: '/pickedOrders/create/:id_order/',
    name: 'PickedOrder_create',
    component : PickedOrder
  },

  {
    path: '/pickedOrders/edit/:id_order/:id_picked',
    name: 'PickedOrder_edit',
    component : PickedOrder
  },

  {
    path: '/pickedOrders',
    name: 'PickedOrders',
    component : PickedOrders
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Orders from '../views/Orders.vue';
import PickedOrders from '../views/PickedOrders.vue';
import PickedOrderGroups from '../views/PickedOrderGroups.vue';
import OrdersDetails from '../views/OrdersDetails.vue';
import PickedOrder from '../views/PickedOrder.vue';
import PickedOrderGroup from '../views/PickedOrderGroup.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Orders' }
  },
  {
    path: '/orders',
    name: 'Orders',
    component : Orders
  },
  {
    path: '/pickedOrders',
    name: 'PickedOrders',
    component : PickedOrders
  },

  {
    path: '/pickedOrderGroups',
    name: 'PickedOrderGroups',
    component : PickedOrderGroups
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
    path: '/pickedOrderGroups/create/',
    name: 'PickedOrderGroup_create',
    component : PickedOrderGroup
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

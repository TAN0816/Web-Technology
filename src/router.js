import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard from './views/admin/AdminDashboard.vue'
import MenuManageList from "./views/admin/menuManageList.vue"
import OrderManageList from "./views/admin/orderManageList.vue"
import OrderDetails from "./views/admin/orderDetails.vue"
import HomeWrapper from "./views/HomeWrapper.vue"

const routes = [
  { path: '/', component: HomeWrapper },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/admin/menu',
    name: 'AdminMenuManage',
    component: MenuManageList
  },
  {
    path: '/admin/order',
    name: 'AdminOrderManage',
    component: OrderManageList
  },
  {
    path: '/admin/orderDetail',
    name: 'AdminOrderDetail',
    component: OrderDetails
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
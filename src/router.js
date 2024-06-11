import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard from './views/admin/AdminDashboard.vue'
import MenuManageList from "./views/admin/MenuManageList.vue"
import OrderManageList from "./views/admin/OrderManageList.vue"
import UserManageList from "./views/admin/UserManageList.vue"
import OrderDetails from "./views/admin/OrderDetails.vue"
import MenuCart from "./views/user/MenuCart.vue"
import PaymentPage from "./views/user/PaymentPage.vue"
import HomeWrapper from "./views/HomeWrapper.vue"

const routes = [
  { path: '/', component: HomeWrapper },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/admin/menuManage',
    name: 'AdminMenuManage',
    component: MenuManageList
  },
  {
    path: '/admin/userManage',
    name: 'UserManage',
    component: UserManageList
  },
  {
    path: '/admin/orderManage',
    name: 'AdminOrderManage',
    component: OrderManageList
  },
  {
    path: '/admin/orderDetail',
    name: 'AdminOrderDetail',
    component: OrderDetails
  },
  {
    path: '/user/MenuCart',
    name: 'UserMenuCart',
    component: MenuCart,
  },
  {
    path: '/user/PaymentPage',
    name: 'PaymentPage',
    component: PaymentPage,
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
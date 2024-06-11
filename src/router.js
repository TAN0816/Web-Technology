import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from './views/RegisterForm.vue'
import AdminDashboard from './views/admin/AdminDashboard.vue'
import MenuManageList from "./views/admin/MenuManageList.vue"
import OrderManageList from "./views/admin/OrderManageList.vue"
import UserManageList from "./views/admin/UserManageList.vue"
import OrderDetails from "./views/admin/OrderDetails.vue"
import MenuCart from "./views/user/MenuCart.vue"
import PaymentPage from "./views/user/PaymentPage.vue"
import HomeWrapper from "./views/HomeWrapper.vue"
import Home from "./views/user/Home.vue"
import LoginForm from './views/LoginForm.vue'

import UserOrder from "./views/user/UserOrder.vue"

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
    path: '/register',
    name: 'RegisterForm',
    component: RegisterForm
  },
  {
  path: '/login',
  name: 'LoginForm',
  component: LoginForm
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
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
  },
  {
    path: '/user/order',
    name: 'UserOrder',
    component: UserOrder
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
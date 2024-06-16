import { createApp } from 'vue'
import App from './App.vue'
import Landing from './views/HomeWrapper.vue';
import MyNavBar from './components/NavBar.vue'
import HomeHeader from './components/HomeHeader.vue' 

import AdminHeader from './components/adminHeader.vue';
import UserHeader from './components/userHeader.vue';
import router from './router';

const app = createApp(App);

app.component('home-wrapper', Landing);
app.component('navigation-bar', MyNavBar);
app.component('home-header', HomeHeader);

app.component('AdminHeader', AdminHeader);
app.component('UserHeader', UserHeader)
app.use(router);
app.mount('#app');

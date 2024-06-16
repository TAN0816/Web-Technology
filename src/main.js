import { createApp } from 'vue'
import App from './App.vue'
import Landing from './views/HomeWrapper.vue';

import AdminHeader from './components/adminHeader.vue';
import UserHeader from './components/userHeader.vue';
import GuestHeader from './components/GuestHeader';
import router from './router';

const app = createApp(App);

app.component('home-wrapper', Landing);

app.component('AdminHeader', AdminHeader);
app.component('UserHeader', UserHeader);
app.component('GuestHeader', GuestHeader);
app.use(router);
app.mount('#app');

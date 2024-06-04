import { createApp } from 'vue'
import App from './App.vue'
import Landing from './views/HomeWrapper.vue';
import MyNavBar from './components/NavBar.vue'
import router from './router';
const app = createApp(App);

app.component('home-wrapper', Landing);
app.component('navigation-bar', MyNavBar);
app.use(router);
app.mount('#app');

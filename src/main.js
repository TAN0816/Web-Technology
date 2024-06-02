import { createApp } from 'vue'
import App from './App.vue'
import Landing from './components/HomeWrapper.vue';
import MyNavBar from './components/NavBar.vue'

const app = createApp(App);

app.component('home-wrapper', Landing);
app.component('navigation-bar', MyNavBar);

app.mount('#app');

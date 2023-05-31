import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import KeyRegister from '@/components/';

const app = createApp(App);
app.use(KeyRegister,{
    // Timeout in milliseconds to wait for the next keypress
    timeout: 500,
    // Timeout in milliseconds to block key events after a key sequence is matched
    blockingDelay: 10,
});
app.mount('#app');

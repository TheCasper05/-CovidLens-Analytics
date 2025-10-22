/* The code you provided is a TypeScript script that sets up a Vue.js application with Pinia for state
management, PrimeVue for UI components, and routing. Here's a breakdown of what each part of the
code is doing: */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import primevue from 'primevue/config'
import 'primeicons/primeicons.css?inline'

/* The code snippet `const app = createApp(App)` is creating a new Vue application instance with the
root component `App`. */
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(primevue, { unstyled: true })


/* The `app.mount('#app')` code is mounting the Vue application to a specific HTML element with the id
of `app`. This means that the Vue application will be rendered and displayed within the HTML element
that has the id of `app` in the DOM. */

app.mount('#app')

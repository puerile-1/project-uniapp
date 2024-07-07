import { createSSRApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
import store from './store'
// import Vant from 'vant'
// import 'vant/lib/index.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  // app.use(Vant)
  return {
    app,
  }
}

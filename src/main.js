import Vue from 'vue'
import Accueil from './Accueil.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Accueil),
}).$mount('#Accueil')

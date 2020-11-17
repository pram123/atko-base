/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import router from './routes/routes'

import './registerServiceWorker'

//
import Auth from '@okta/okta-vue'
import oktaConfig from './.okta.conf.js'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// plugin setup
Vue.use(VueRouter)
Vue.use(Auth)
Vue.use(LightBootstrap)
Vue.use(lodash);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})


import Vue from 'vue'
import Router from 'vue-router'

import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Auth from '@okta/okta-vue'
import oktaConfig from '../.okta.conf.js'
import LoginWidget from "../components/Login/LoginWidgetDev";
import LoginWidgetProd from "@/components/Login/LoginWidgetProd";
import LoginWidgetDev from "@/components/Login/LoginWidgetDev";
import Login from "@/components/Login/Login";


Vue.use(Router)
Vue.use(Auth, oktaConfig.oidc)


const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview',
    meta: {
      requiresAuth: true
    }
  },
  { path: '/callback', component: Auth.handleCallback() },
  {
    path: '/loginWidgetDev',
    component: LoginWidgetDev,
    name: 'loginWidgetDev',
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
  },
  {
    path: '/loginWidgetProd',
    component: LoginWidgetProd,
    name: 'loginWidgetProd',
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

// configure router
const router = new Router({
  mode: 'history',
  routes: routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})


const onAuthRequired = async (from, to, next) => {
  if (from.matched.some(record => record.meta.requiresAuth) && !(await Vue.prototype.$auth.isAuthenticated())) {
    // Navigate to custom login page
    next({ path: '/login' })
  } else {
    next()
  }
}

router.beforeEach(onAuthRequired)
router.beforeEach(Vue.prototype.$auth.authRedirectGuard())


export default router

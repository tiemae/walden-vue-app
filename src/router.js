import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Show from './views/Users/Show.vue';
import Edit from './views/Users/Edit.vue';
import Signup from "./views/Authentications/Signup.vue";
import Login from "./views/Authentications/Login.vue";
import Logout from "./views/Authentications/Logout.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/users/:id',
      name: 'users-show',
      component: Show
    },
    {
      path: '/users/:id/edit',
      name: 'users-edit',
      component: Edit
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
});

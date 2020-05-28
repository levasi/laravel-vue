/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Dashboard from './components/Dashboard.vue'
import Profile from './components/Profile.vue'
import Users from './components/Users.vue'

let routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/profile', component: Profile },
  { path: '/users', component: Users }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);


const app = new Vue({
  el: '#app',
  router
});

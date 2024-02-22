// stores/counter.js
import { defineStore } from 'pinia'

import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    email: '',
    isMenuOverlay: false,
    isLoading: false,
    cart: [],
    checkout: [],
    appApiURL: import.meta.env.VITE_VUE_APP_API_URL
  }),
  actions: {

    async hasSessionExpired() {
      await $axios.interceptors.response.use((response) => {
        // Call was successful, continue.
        return response;
      }, (error) => {
          switch (error.response.status) {
              case 401: // Not logged in
            case 419: // Session expired
                  alert('Oops, session expired! Please log in again.');
                  this.resetState()
                  window.location.href = '/';
                  break;
              case 503: // Down for maintenance
                  // Bounce the user to the login screen with a redirect back
                  this.resetState()
                  window.location.href = '/';
                  break;
              case 500:
                  alert('Oops, something went wrong!  The team has been notified.');
                  break;
              default:
                  // Allow individual requests to handle other errors
                  return Promise.reject(error);
          }
      });
    },
    
    async getTokens() {
      await $axios.get('/sanctum/csrf-cookie')
    },

    async login(email, password) {
      await $axios.post('/login', {
        email: email,
        password: password
      })
    },

    async register(name, email, password, confirmPassword) {
      await $axios.post('/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword
      })
    },

    async getUser() {
      let res = await $axios.get('/api/users')
    
      this.$state.id = res.data.id
      this.$state.name = res.data.name

    },

    async logout() {
      await $axios.post('/logout')
      this.resetState()
    },
  
    resetState() {
      this.$state.id = ''
      this.$state.name = ''
      this.$state.email = ''
    }
  },

  persist: true
})
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    userData: null,
    products: [],
    shoppingCart: []
  },
  mutations: {
    SET_USER_DATA (state, payload) {
      state.userData = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_UNSELECT (state) {
      state.shoppingCart.map(cart => {
        cart.selected = false
        return cart
      })
    },
    SET_SELECT (state, payload) {
      state.shoppingCart.find(cart => cart.id === payload).selected = true
    },
    UPDATE_CART (state, payload) {
      state.shoppingCart.find(cart => cart.selected === true).qty = payload
    }
  },
  actions: {
    loadUserData ({ commit }, payload) {
      commit('SET_USER_DATA', payload)
    },
    loadProduct ({ commit }, payload) {
      commit('SET_PRODUCTS', payload)
    },
    clearCart ({ state }) {
      state.shoppingCart = []
    },
    updateCartQuantity ({ commit }, payload) {
      commit('UPDATE_CART', payload)
    },
    logout ({ state }) {
      state.userData = null
      state.shoppingCart = []
      window.localStorage.clear()
    }
  },
  getters: {
    userData (state) {
      return state.userData
    },
    products (state) {
      return state.products
    },
    shoppingCart (state) {
      return state.shoppingCart
    }
  },
  // plugins: [createPersistedState({ storage: window.sessionStorage })]
  plugins: [createPersistedState({ storage: window.localStorage })]
})

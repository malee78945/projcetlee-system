// store/cart.js
const state = {
  bookingItems: [],
  cartDrawer: false 
}

const getters = {
  getbookingitems: (state) => { 
    return state.bookingItems
  },
  getTotalPrice: (state) => {
    return state.bookingItems.reduce((total, item) => total + item.price, 0);
  },
  isCartOpen: state => state.cartDrawer,
  itemCount: state => state.bookingItems.length, 
}

const actions = {
  addtocart: ({ commit }, servicePayload) => {
    commit('ADD_TO_CART', servicePayload)
    commit('SET_CART_DRAWER', true) 
  },
  removeFromCart: ({ commit }, index) => {
    commit('REMOVE_FROM_CART', index)
  },
  openCart({ commit }) {
    commit('SET_CART_DRAWER', true);
  },
  closeCart({ commit }) {
    commit('SET_CART_DRAWER', false);
  }
}

const mutations = {
  ADD_TO_CART (state, servicePayload) {
    state.bookingItems.push({
      ...servicePayload,
      bookingDate: null, 
      bookingTime: null,
    })
  },
  SET_CART_DRAWER(state, value) {
    state.cartDrawer = value;
  },
  REMOVE_FROM_CART (state, index) {
    state.bookingItems.splice(index, 1);
    if (state.bookingItems.length === 0) {
        state.cartDrawer = false;
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
import Vue from 'vue'

export const state = () => ({
  items: [],
  cartDrawer: false
})

export const getters = {
  getbookingitems: (state) => state.items,
  getTotalPrice: (state) => {
    return state.items.reduce((total, item) => {
      // ป้องกันกรณี price เป็น string หรือ undefined
      const price = parseFloat(item.price) || 0
      return total + (price * item.quantity)
    }, 0)
  },
  cartCount: (state) => state.items.length
}

export const mutations = {
  ADD_TO_CART(state, product) {
    // แยก Key ตามประเภท (สินค้าใช้ products_id / บริการใช้ serviceID)
    const idKey = product.products_id ? 'products_id' : 'serviceID'
    const itemIndex = state.items.findIndex(i => i[idKey] === product[idKey])

    if (itemIndex > -1) {
      // ใช้ Vue.set เพื่อให้ UI อัปเดตทันทีเมื่อเพิ่มจำนวน
      const newQuantity = state.items[itemIndex].quantity + 1
      Vue.set(state.items[itemIndex], 'quantity', newQuantity)
    } else {
      state.items.push({ 
        ...product, 
        quantity: 1,
        bookingDate: null, 
        bookingTime: null 
      })
    }
  },

  SET_BOOKING_DATE(state, { index, bookingDate, bookingTime }) {
    if (state.items[index]) {
      // อัปเดตแบบ Object Spread เพื่อความชัวร์ว่า UI จะเปลี่ยนตาม
      const updatedItem = {
        ...state.items[index],
        bookingDate,
        bookingTime
      }
      Vue.set(state.items, index, updatedItem)
    }
  },

  REMOVE_FROM_CART(state, index) {
    state.items.splice(index, 1)
  },

  CLEAR_CART(state) {
    state.items = []
  },

  TOGGLE_DRAWER(state, val) {
    state.drawer = val !== undefined ? val : !state.drawer
  }
}

export const actions = {
  addtocart({ commit }, product) {
    commit('ADD_TO_CART', product)
  },
  setBookingDate({ commit }, payload) {
    commit('SET_BOOKING_DATE', payload)
  },
  removeFromCart({ commit }, index) {
    commit('REMOVE_FROM_CART', index)
  },
  clearCart({ commit }) {
    commit('CLEAR_CART')
  }
}
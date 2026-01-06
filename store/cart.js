// store/cart.js

export const state = () => ({
  items: [],
  cartDrawer: false
})

export const getters = {
  getbookingitems: (state) => state.items,
  getTotalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const mutations = {
  ADD_TO_CART(state, product) {
    const idKey = product.products_id ? 'products_id' : 'serviceID'
    const item = state.items.find(i => i[idKey] === product[idKey])
    if (item) {
      item.quantity++
    } else {
      state.items.push({ 
        ...product, 
        quantity: 1,
        bookingDate: null, 
        bookingTime: null 
      })
    }
  },
  // สำหรับตั้งวันที่และเวลา (ตามที่ไฟล์ CartSummary เรียกใช้)
SET_BOOKING_DATE(state, { index, bookingDate, bookingTime }) {
  if (state.items[index]) {
    state.items[index].bookingDate = bookingDate
    state.items[index].bookingTime = bookingTime
  }
},
  // สำหรับลบรายการ (ตามที่ไฟล์ CartSummary เรียกใช้)
  REMOVE_FROM_CART(state, index) {
    state.items.splice(index, 1)
  },
  CLEAR_CART(state) {
    state.items = []
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
  }
}
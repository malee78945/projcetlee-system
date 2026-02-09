export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  SET_AUTH(state, payload) {
    state.token = payload.token
    state.user = payload.user
  },
  LOGOUT(state) {
    state.token = null
    state.user = null
  }
}

export const actions = {
  initAuth({ commit }) {
    if (process.client) {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        try {
          commit('SET_AUTH', {
            token,
            user: JSON.parse(user)
          })
        } catch (e) {
          // ถ้า JSON.parse พัง ให้ล้างค่าทิ้งป้องกันเว็บค้าง
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      } else {
        // ถ้าไม่มี token/user ให้มั่นใจว่า state เป็น null
        commit('LOGOUT')
      }
    }
  }
}
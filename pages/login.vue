<template>
  <v-container fluid class="fill-height login-gradient">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-8 rounded-xl elevation-10">

          <!-- HEADER -->
          <div class="text-center mb-6">
            <v-avatar color="blue lighten-5" size="72" class="mb-3">
              <v-icon size="40" color="blue">mdi-paw</v-icon>
            </v-avatar>
            <h2 class="headline font-weight-bold blue--text text--darken-4">
              เข้าสู่ระบบ
            </h2>
            <p class="grey--text">จัดการการจองบริการสัตว์เลี้ยงของคุณ</p>
          </div>

          <!-- FORM -->
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="phone"
              label="เบอร์โทรศัพท์"
              prepend-inner-icon="mdi-phone"
              outlined
              rounded
              color="blue"
              background-color="blue lighten-5"
            />

            <v-text-field
              v-model="password"
              label="รหัสผ่าน"
              prepend-inner-icon="mdi-lock"
              type="password"
              outlined
              rounded
              color="blue"
              background-color="blue lighten-5"
            />

            <v-btn
              block
              x-large
              color="blue darken-1"
              dark
              class="rounded-pill mt-4 elevation-2"
              @click="login"
            >
              เข้าสู่ระบบ
            </v-btn>

            <v-btn
              block
              text
              color="blue"
              class="mt-2"
              to="/register"
            >
              ยังไม่มีบัญชี? สมัครสมาชิก
            </v-btn>
          </v-form>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        const res = await this.$axios.post('login.php', {
          phone: this.phone,
          password: this.password
        })

        if (res.data.status === 'success') {
          localStorage.setItem('user', JSON.stringify(res.data.user))
          alert('เข้าสู่ระบบสำเร็จ')
          this.$router.push('/index_c')
        } else {
          alert(res.data.message)
        }
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์')
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.login-gradient {
  background: linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%);
}
</style>

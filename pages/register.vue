<template>
  <v-container
    fluid
    class="register-page d-flex align-center justify-center"
  >
    <v-card
      class="register-card pa-10"
      elevation="12"
      max-width="480"
      width="100%"
    >
      <!-- HEADER -->
      <div class="text-center mb-8">
        <v-icon size="56" color="blue">mdi-dog</v-icon>
        <h1 class="register-title mt-4">สมัครสมาชิก</h1>
        <p class="register-subtitle">
          เพื่อใช้บริการอาบน้ำและดูแลน้องหมาอย่างมืออาชีพ
        </p>
      </div>

      <!-- FORM -->
      <v-form @submit.prevent="register">
        <v-text-field
          v-model="form.name"
          label="ชื่อผู้ใช้งาน"
          outlined
          dense
          prepend-inner-icon="mdi-account"
          required
        />

        <v-text-field
          v-model="form.phone"
          label="เบอร์โทรศัพท์"
          outlined
          dense
          prepend-inner-icon="mdi-phone"
          required
        />

        <v-text-field
          v-model="form.password"
          label="รหัสผ่าน"
          type="password"
          outlined
          dense
          prepend-inner-icon="mdi-lock"
          required
        />

        <v-select
          v-model="form.role"
          :items="roles"
          label="ประเภทผู้ใช้งาน"
          outlined
          dense
          prepend-inner-icon="mdi-account-badge"
        />

        <v-btn
          block
          large
          color="blue"
          class="mt-6"
          depressed
          type="submit"
        >
          สมัครสมาชิก
        </v-btn>
      </v-form>

      <!-- FOOTER -->
      <div class="text-center mt-6">
        <span class="grey--text">
          มีบัญชีอยู่แล้ว?
        </span>
        <NuxtLink to="/login" class="login-link ml-1">
          เข้าสู่ระบบ
        </NuxtLink>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        password: '',
        role: 'customer'
      },
      roles: [
        { text: 'ลูกค้า', value: 'customer' },
        { text: 'เจ้าของร้าน', value: 'owner' }
      ]
    }
  },
  methods: {
    async register() {
      try {
        const res = await this.$axios.post('register.php', this.form)

        if (res.data.status === 'success') {
          alert('สมัครสมาชิกสำเร็จ')
          this.$router.push('/login')
        } else {
          alert(res.data.message)
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์')
      }
    }
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #f5f7fb 0%,
    #e8effa 100%
  );
}

.register-card {
  border-radius: 24px;
}

.register-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1e3a8a;
}

.register-subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  max-width: 320px;
  margin: 0 auto;
}

.login-link {
  color: #1e88e5;
  font-weight: 600;
  text-decoration: none;
}
</style>

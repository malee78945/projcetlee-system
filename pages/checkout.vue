<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-5" elevation="2">
          <h2 class="text-h5 mb-4"><v-icon left>mdi-account-details</v-icon> ข้อมูลผู้จองและสัตว์เลี้ยง</h2>
          
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.owner_name" label="ชื่อเจ้าของ" outlined dense required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.pet_name" label="ชื่อสัตว์เลี้ยง" outlined dense required></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select v-model="form.pet_type" :items="['สุนัข', 'แมว', 'อื่นๆ']" label="ประเภทสัตว์" outlined dense></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field v-model="form.breed" label="สายพันธุ์" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select v-model="form.pet_size" :items="['เล็ก', 'กลาง', 'ใหญ่']" label="ขนาดสัตว์" outlined dense></v-select>
            </v-col>
          </v-row>

          <v-divider class="my-6"></v-divider>

          <h2 class="text-h5 mb-4"><v-icon left>mdi-credit-card-outline</v-icon> ช่องทางการชำระเงิน</h2>
          <v-radio-group v-model="form.payment_method" row>
            <v-radio label="โอนเงินผ่านธนาคาร" value="transfer"></v-radio>
            <v-radio label="ชำระที่หน้าร้าน" value="walkin"></v-radio>
          </v-radio-group>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-5" elevation="4" color="grey lighten-4">
          <h2 class="text-h6 mb-4">สรุปรายการจอง</h2>
          <v-list dense bg-color="transparent">
            <v-list-item v-for="(item, index) in bookingitems" :key="index" class="px-0">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.bookingDate }} | {{ item.bookingTime }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                {{ item.price }} ฿
                <v-btn icon x-small color="error" @click="removeItem(index)"><v-icon>mdi-close-circle</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider class="my-4"></v-divider>
          <div class="d-flex justify-space-between text-h6">
            <span>รวมทั้งสิ้น</span>
            <span class="primary--text font-weight-bold">{{ totalPrice }} บาท</span>
          </div>

          <v-btn
            block color="success" class="mt-6 white--text" large elevation="2"
            :loading="loading"
            @click="confirmPayment"
          >
            ยืนยันการชำระเงิน
          </v-btn>
          <v-btn block text color="grey" class="mt-2" @click="$router.push('/')">กลับไปเลือกบริการ</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="alert.show" :color="alert.color" timeout="3000" top>
      {{ alert.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      form: {
        owner_name: '',
        pet_name: '',
        pet_type: 'สุนัข',
        breed: '',
        pet_size: 'กลาง',
        payment_method: 'transfer'
      },
      alert: {
        show: false,
        message: '',
        color: 'error'
      }
    }
  },
  computed: {
    ...mapGetters('cart', {
      bookingitems: 'getbookingitems',
      totalPrice: 'getTotalPrice'
    })
  },
  methods: {
    ...mapActions('cart', ['removeFromCart']),
    
    removeItem(index) {
      if(confirm('ลบรายการนี้ใช่หรือไม่?')) {
        this.removeFromCart(index)
      }
    },

    async confirmPayment() {
      // ระบบแจ้งเตือนข้อผิดพลาด (Validation)
      if (!this.form.owner_name || !this.form.pet_name) {
        this.showAlert('กรุณากรอกข้อมูลผู้จองและสัตว์เลี้ยงให้ครบถ้วน', 'error')
        return
      }
      if (this.bookingitems.length === 0) {
        this.showAlert('ไม่มีรายการในตะกร้า', 'warning')
        return
      }

      this.loading = true
      try {
        const payload = {
          ...this.form,
          total_price: this.totalPrice,
          items: this.bookingitems
        }
        
        const res = await this.$axios.post('http://localhost/myfirst_nuxt_app_api-main/order_insert.php', payload)
        
        if (res.data.status) {
          this.showAlert('บันทึกการจองและชำระเงินสำเร็จ!', 'success')
          this.$store.commit('cart/CLEAR_CART')
          setTimeout(() => this.$router.push('/'), 2000)
        } else {
          this.showAlert(res.data.message, 'error')
        }
      } catch (err) {
        this.showAlert('ไม่สามารถติดต่อเซิร์ฟเวอร์ได้', 'error')
      } finally {
        this.loading = false
      }
    },

    showAlert(msg, color) {
      this.alert.message = msg
      this.alert.color = color
      this.alert.show = true
    }
  }
}
</script>
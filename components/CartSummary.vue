<template>
  <v-card class="cart-summary-card pa-5" elevation="4">
    <h2 class="text-h5 mb-4">รายการจองบริการ (Cart)</h2>

    <v-list dense class="py-0">
      <p v-if="!bookingitems || bookingitems.length === 0" class="grey--text text-center py-4">
        ตะกร้าว่างเปล่า
      </p>

      <v-list-item v-for="(item, index) in bookingitems" :key="index" class="mb-2">
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            {{ item.name }} ({{ item.price }} บาท)
          </v-list-item-title>
          <v-list-item-subtitle>
             วันที่: {{ item.bookingDate || 'ยังไม่ได้ระบุ' }} | 
             เวลา: {{ item.bookingTime || 'ยังไม่ได้ระบุ' }}
          </v-list-item-subtitle>
        </v-list-item-content>
        
        <v-list-item-action class="d-flex flex-row align-center">
          <v-btn small depressed color="secondary" @click="promptForDateTime(index)" class="mr-2">
            ตั้งเวลา
          </v-btn>
          <v-btn small icon color="error" @click="removeItem(index)"> 
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    
    <v-divider class="my-4"></v-divider>

    <div class="d-flex justify-space-between align-center mt-3">
      <span class="text-h6 font-weight-regular">ราคารวม (Subtotal)</span>
      <span class="text-h5 font-weight-bold primary--text">{{ totalPrice }} บาท</span>
    </div>

    <div class="d-flex justify-end mt-6">
      <v-btn
        color="primary"
        class="white--text"
        large
        elevation="2"
        :disabled="bookingitems.length === 0"
        @click="proceedToCheckout"
      >
        Proceed to Checkout
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', {
      bookingitems: 'getbookingitems',
      totalPrice: 'getTotalPrice'
    }),
  },
  methods: {
    ...mapActions('cart', ['setBookingDate', 'removeFromCart']),

    async proceedToCheckout() {
      if (this.bookingitems.length === 0) return;
      if (!confirm('ยืนยันการบันทึกการจองหรือไม่?')) return;
      const payload = {
        total_price: this.totalPrice,
        items: this.bookingitems 
      };
      try {
        let result = await this.$axios.post('http://localhost/myfirst_nuxt_app_api-main/cart_save.php', payload);
        if (result.data.status) {
          alert('บันทึกการจองสำเร็จ!');
          this.$store.commit('cart/CLEAR_CART'); 
        } else {
          alert('เกิดข้อผิดพลาดจาก Server: ' + result.data.message);
        }
      } catch (error) {
        console.error(error);
        alert('ไม่สามารถติดต่อ Server ได้');
      }
    },
    promptForDateTime(index) {
      const date = prompt('กรอกวันที่จอง (YYYY-MM-DD):');
      const time = prompt('กรอกเวลาจอง (HH:mm):');
      if (date && time) {
        this.setBookingDate({ index, date, time });
      }
    },
    removeItem(index) {
      this.removeFromCart(index);
    }
  }
}
</script>
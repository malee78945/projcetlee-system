<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-6 rounded-xl elevation-8">

          <div class="text-center mb-6">
            <v-icon size="48" color="green">mdi-cash-check</v-icon>
            <h2 class="mt-3 font-weight-bold">ชำระเงิน</h2>
            <p class="grey--text">ตรวจสอบรายการก่อนยืนยันการชำระเงิน</p>
          </div>

          <v-card outlined class="pa-4 mb-6">
            <h3 class="mb-3">📋 รายละเอียดการจอง</h3>

            <p><strong>บริการ:</strong> {{ booking.service_name }}</p>
            <p><strong>วันที่:</strong> {{ booking.booking_date }}</p>
            <p><strong>เวลา:</strong> {{ booking.booking_time }}</p>

            <p class="text-h6 mt-2">
              <strong>รวมทั้งหมด:</strong>
              <span class="green--text">{{ booking.price }} บาท</span>
            </p>
          </v-card>

          <h3 class="mb-3">💳 เลือกวิธีชำระเงิน</h3>

          <v-radio-group v-model="paymentMethod">
            <v-radio label="พร้อมเพย์ (QR Code)" value="promptpay" />
            <v-radio label="เงินสดหน้าร้าน" value="cash" />
          </v-radio-group>

          <v-btn
            block
            x-large
            color="green darken-1"
            dark
            class="mt-6 rounded-pill"
            @click="confirmPayment"
          >
            ยืนยันการชำระเงิน
          </v-btn>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      bookingId: null,
      booking: {},
      paymentMethod: ''
    }
  },

  mounted() {
    this.bookingId = this.$route.query.booking_id
    if (!this.bookingId) {
      alert('ไม่พบข้อมูลการจอง')
      this.$router.push('/')
      return
    }
    this.fetchBooking()
  },

  methods: {
    async fetchBooking() {
      try {
        const res = await this.$axios.get(
          `get_booking.php?booking_id=${this.bookingId}`
        )
        this.booking = res.data
      } catch (err) {
        alert('โหลดข้อมูลการจองไม่สำเร็จ')
      }
    },

    async confirmPayment() {
      if (!this.paymentMethod) {
        alert('กรุณาเลือกวิธีชำระเงิน')
        return
      }

      await this.$axios.post('payment.php', {
        booking_id: this.bookingId,
        payment_method: this.paymentMethod,
        amount: this.booking.price
      })

      alert('บันทึกการชำระเงินเรียบร้อย 🐾')
      this.$router.push('/history')
    }
  }
}
</script>
<style scoped>
.v-card {
  background: #bbdbff;
}
</style>

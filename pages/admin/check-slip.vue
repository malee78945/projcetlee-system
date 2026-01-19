<template>
  <v-container class="py-10">
    <h2 class="font-weight-bold mb-6">📋 ตรวจสอบสลิปการชำระเงิน</h2>

    <v-row>
      <v-col
        v-for="item in payments"
        :key="item.id"
        cols="12"
        md="4"
      >
        <v-card class="rounded-xl elevation-6">

          <v-img
            :src="imageUrl(item.slip_image)"
            height="240"
            cover
          />

          <v-card-text>
            <p><strong>Booking ID:</strong> {{ item.booking_id }}</p>
            <p><strong>สถานะ:</strong>
              <v-chip color="orange" dark small>
                {{ item.payment_status }}
              </v-chip>
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="green"
              dark
              @click="updateStatus(item.id, 'approved')"
            >
              อนุมัติ
            </v-btn>

            <v-btn
              color="red"
              dark
              @click="updateStatus(item.id, 'rejected')"
            >
              ปฏิเสธ
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      payments: []
    }
  },
  mounted() {
    this.fetchPayments()
  },
  methods: {
    imageUrl(file) {
      return `http://localhost/myfistapp_api/uploads/slips/${file}`
    },

    async fetchPayments() {
      const res = await this.$axios.get('get_payments.php')
      this.payments = res.data
    },

    async updateStatus(id, status) {
      if (!confirm('ยืนยันการดำเนินการ?')) return

      await this.$axios.post('update_payment_status.php', {
        id,
        status
      })

      alert('อัปเดตสถานะเรียบร้อย')
      this.fetchPayments()
    }
  }
}
</script>

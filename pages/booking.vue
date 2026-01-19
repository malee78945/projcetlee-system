<template>
  <v-container class="py-10">

    <v-row justify="center">
      <v-col cols="12" md="6">

        <v-card class="pa-6 rounded-xl elevation-8">

          <!-- HEADER -->
          <div class="text-center mb-6">
            <v-icon size="48" color="blue">mdi-calendar-check</v-icon>
            <h2 class="mt-3 font-weight-bold">จองบริการ</h2>
            <p class="grey--text">เลือกวันและเวลาที่ต้องการ</p>
          </div>

          <!-- SERVICE INFO -->
          <v-card outlined class="pa-4 mb-6" v-if="service">
            <p><strong>บริการ:</strong> {{ service.name }}</p>
            <p><strong>รายละเอียด:</strong> {{ service.description }}</p>
            <p class="text-h6 mt-2">
              <strong>ราคา:</strong>
              <span class="blue--text">{{ service.price }} บาท</span>
            </p>
          </v-card>

          <!-- DATE -->
          <v-text-field
            v-model="bookingDate"
            label="เลือกวันที่"
            type="date"
            outlined
            prepend-inner-icon="mdi-calendar"
            class="mb-4"
          />

          <!-- TIME -->
          <v-select
            v-model="bookingTime"
            :items="timeSlots"
            label="เลือกเวลา"
            outlined
            prepend-inner-icon="mdi-clock-outline"
          />

          <!-- CONFIRM -->
          <v-btn
            block
            x-large
            color="blue darken-1"
            dark
            class="mt-6 rounded-pill"
            @click="confirmBooking"
          >
            ยืนยันการจอง
          </v-btn>

        </v-card>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data () {
    return {
      service: null,
      bookingDate: '',
      bookingTime: '',
      timeSlots: [
        '09:00',
        '10:00',
        '11:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00'
      ]
    }
  },

  async mounted () {
    const serviceId = this.$route.query.service_id

    if (!serviceId) {
      alert('ไม่พบบริการ')
      this.$router.push('/products')
      return
    }

    try {
      const res = await this.$axios.get(
        `get_service_detail.php?id=${serviceId}`
      )

      // backend ต้องส่ง object เดียว
      this.service = res.data

    } catch (err) {
      console.error(err)
      alert('โหลดข้อมูลบริการไม่สำเร็จ')
    }
  },

  methods: {
    confirmBooking () {
      if (!this.bookingDate || !this.bookingTime) {
        alert('กรุณาเลือกวันที่และเวลา')
        return
      }

      // เก็บข้อมูลการจองไว้ใช้ต่อ
      const bookingData = {
        service_id: this.service.id,
        service_name: this.service.name,
        price: this.service.price,
        date: this.bookingDate,
        time: this.bookingTime
      }

      localStorage.setItem(
        'booking_data',
        JSON.stringify(bookingData)
      )

      // 👉 ไปหน้าชำระเงิน
      this.$router.push('/payment')
    }
  }
}
</script>

<style scoped>
.v-card {
    color: #000;
  background: #f8fbff;
}
.v-text-field , .v-select {
    color: #000;   }
</style>

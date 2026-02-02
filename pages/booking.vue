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
            <v-btn text block class="mt-2 black--text" @click="$router.back()">ย้อนกลับ</v-btn>
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

  // ป้องกันกรณี service ยังไม่โหลด
  if (!this.service) {
    alert('ข้อมูลบริการไม่สมบูรณ์')
    return
  }

  const bookingData = {
    service_id: this.service.id,
    service_name: this.service.name,
    price: this.service.price,
    date: this.bookingDate,
    time: this.bookingTime
  }

  // บันทึกลงเครื่อง
  localStorage.setItem('booking_data', JSON.stringify(bookingData))

  // ไปหน้าชำระเงิน
  this.$router.push('/payment')
}
  }
}
</script>

<style scoped>
.v-card {
    color: #292929;
  background: #f8fbff;
}
.v-text-field , .v-select {
    color: #161616;   }
    .v-card {
  background: #f8fbff;
}

/* 1. เปลี่ยนสีขอบ (Border) ของช่อง Input ทั้งหมดให้เป็นสีดำ */
:deep(.v-input__control .v-input__slot fieldset) {
  border-color: rgba(0, 0, 0, 1) !important; /* สีดำสนิท */
  border-width: 1.5px; /* เพิ่มความหนาของขอบเล็กน้อยเพื่อให้ชัดขึ้น */
}

/* 2. เปลี่ยนสีขอบเวลาเอาเมาส์ไปวาง (Hover) */
:deep(.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot:hover fieldset) {
  border-color: #000000 !important;
}

/* 3. เปลี่ยนสีขอบเวลาที่กำลังกดเลือก (Focus) */
:deep(.v-text-field--outlined.v-input--is-focused fieldset) {
  border-color: #000000 !important;
  border-width: 2px;
}

/* (ของเดิมจากข้อที่แล้ว) ทำให้ตัวหนังสือข้างในเป็นสีดำด้วย */
:deep(input), :deep(.v-select__selection), :deep(.v-label) {
  color: black !important;
}
</style>

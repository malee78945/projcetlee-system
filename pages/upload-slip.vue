<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="5">

        <v-card class="pa-6 rounded-xl elevation-8">

          <div class="text-center mb-6">
            <v-icon size="48" color="green">mdi-receipt</v-icon>
            <h2 class="mt-3 font-weight-bold">อัปโหลดสลิปการชำระเงิน</h2>
          </div>

          <v-file-input
            v-model="slip"
            label="เลือกรูปสลิป"
            accept="image/*"
            outlined
            prepend-icon="mdi-camera"
          />

          <v-btn
            block
            x-large
            color="green darken-1"
            dark
            class="rounded-pill mt-4"
            @click="uploadSlip"
          >
            ส่งสลิป
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
      slip: null
    }
  },
  methods: {
    async uploadSlip() {
      if (!this.slip) {
        alert('กรุณาเลือกไฟล์สลิป')
        return
      }

      const formData = new FormData()
      formData.append('slip', this.slip)
      formData.append('booking_id', 1) // ตัวอย่าง

      try {
        const res = await this.$axios.post(
          'upload_slip.php',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        if (res.data.status === 'success') {
          alert('อัปโหลดสลิปเรียบร้อย')
          this.$router.push('/history')
        } else {
          alert(res.data.message)
        }
      } catch (err) {
        alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้')
      }
    }
  }
}
</script>
 
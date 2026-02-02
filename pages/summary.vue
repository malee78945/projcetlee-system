<template>
  <v-container class="py-10 text-center">
    <v-card class="pa-8 rounded-xl elevation-10 mx-auto" max-width="500">
      <v-icon size="80" color="blue">mdi-check-circle</v-icon>
      <h2 class="mt-4 black--text font-weight-bold">จองบริการสำเร็จ!</h2>
      <p class="grey--text">ขอบคุณที่ใช้บริการของเรา 🐾</p>

      <v-divider class="my-6"></v-divider>

      <div v-if="summaryData" class="text-left mb-6 pa-4 grey lighten-4 rounded-lg">
        <p class="black--text"><strong>บริการ:</strong> {{ summaryData.service_name }}</p>
        <p class="black--text"><strong>วันที่:</strong> {{ summaryData.date }}</p>
        <p class="black--text"><strong>เวลา:</strong> {{ summaryData.time }} น.</p>
        <p class="blue--text font-weight-bold text-h6">รวมจ่าย: {{ summaryData.price }} บาท</p>
      </div>

      <v-btn 
            color="blue" 
            block 
            dark 
            x-large 
            rounded 
            @click="$router.push('/history')"
>
  ดูประวัติการจองทั้งหมด
</v-btn>
      <v-btn text block class="mt-2 black--text" @click="$router.push('/')">กลับหน้าหลัก</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      summaryData: null
    }
  },
  mounted() {
    // ดึงข้อมูลการจองล่าสุดที่บันทึกไว้ชั่วคราวมาแสดง
    const data = localStorage.getItem('last_booking')
    if (data) {
      this.summaryData = JSON.parse(data)
    }
  }
}
</script>
<style scoped>
/* พื้นหลังของทั้งหน้าจอ (สีดำสนิท) */
.dark-page {
  background-color: #121212 !important;
}

/* ตัวการ์ดหลัก (สีเทาเข้ม) */
.custom-card {
  background-color: #1e1e1e !important;
  border: 1px solid #333 !important;
}

/* ปรับสีหัวข้อให้เป็นสีขาว */
.white--text {
  color: #ffffff !important;
}

/* กรอบสีขาวสำหรับแสดงข้อมูล (ตามที่คุณต้องการ) */
.white {
  background-color: #ffffff !important;
}

/* เพิ่มเงาเล็กน้อยให้กรอบสีขาวดูนูนขึ้นมา */
.shadow-white-box {
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.05);
}

/* ปรับสีข้อความในกรอบขาวให้เป็นสีดำ */
.black--text {
  color: #000000 !important;
}
.v-card {
    background-color: #ffffff !important;
}

</style>
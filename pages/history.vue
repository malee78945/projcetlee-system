<template>
  <v-container fluid class="fill-height dark-page py-10">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2 class="white--text mb-6 text-center font-weight-bold">
          <v-icon color="blue" class="mr-2">mdi-history</v-icon>ประวัติการจองของฉัน
        </h2>

        <v-card v-if="historyList.length === 0" class="pa-10 custom-card text-center">
          <v-icon size="64" color="grey darken-2">mdi-calendar-blank</v-icon>
          <p class="grey--text mt-4">ยังไม่มีประวัติการจองในขณะนี้</p>
          <v-btn color="blue" dark rounded class="mt-4" @click="$router.push('/products')">
            ไปหน้าจองบริการ
          </v-btn>
        </v-card>

        <v-card 
          v-for="(item, index) in historyList" 
          :key="index" 
          class="mb-4 pa-4 custom-card"
        >
          <v-row align="center">
            <v-col cols="12" sm="8">
              <div class="d-flex align-center mb-2">
                <v-icon color="blue" small class="mr-2">mdi-paw</v-icon>
                <h3 class="white--text">{{ item.service_name }}</h3>
              </div>
              <p class="grey--text mb-1">
                <v-icon x-small color="grey">mdi-calendar</v-icon> วันที่: {{ item.date }}
              </p>
              <p class="grey--text mb-0">
                <v-icon x-small color="grey">mdi-clock-outline</v-icon> เวลา: {{ item.time }} น.
              </p>
            </v-col>
            <v-col cols="12" sm="4" class="text-right">
              <div class="blue--text font-weight-bold text-h6">{{ item.amount || item.price }} บาท</div>
              <v-chip small color="green" dark class="mt-2">ชำระเงินสำเร็จ</v-chip>
            </v-col>
          </v-row>
        </v-card>

        <div class="text-center mt-6">
  <v-btn 
    color="grey darken-3" 
    dark 
    rounded 
    class="px-8"
    @click="$router.push('/')"
  >
    <v-icon left>mdi-home</v-icon>
    กลับหน้าหลัก
  </v-btn>
</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      historyList: [], // ตัวแปรสำหรับเก็บรายการจาก Database
      loading: true
    }
  },
  
  // วางส่วนนี้ลงไปครับ
  async mounted() {
    try {
      // เรียกใช้ไฟล์ PHP ที่เราเพิ่งสร้าง
      const response = await this.$axios.get('get_history.php');
      
      // ดูข้อมูลที่ส่งมาจาก PHP ในหน้า Console (กด F12 ในเบราว์เซอร์)
      console.log("Data from PHP:", response.data); 
      
      // ตรวจสอบว่าข้อมูลที่ได้มาเป็นรายการ (Array) หรือไม่
      if (Array.isArray(response.data)) {
        this.historyList = response.data;
      }
    } catch (err) {
      console.error("ดึงข้อมูลไม่สำเร็จ:", err);
      // ถ้าดึงไม่สำเร็จ ให้ลองดึงข้อมูลล่าสุดจากเครื่องมาโชว์แก้ขัด
      const lastBooking = localStorage.getItem('last_booking');
      if (lastBooking) {
        this.historyList = [JSON.parse(lastBooking)];
      }
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.dark-page {
  background-color: #121212 !important;
  min-height: 100vh;
}
.custom-card {
  background-color: #1e1e1e !important;
  border: 1px solid #333 !important;
  border-radius: 15px !important;
}
.white--text {
  color: #ffffff !important;
}
</style>
<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-6 rounded-xl elevation-8">

          <div class="text-center mb-6">
            <v-icon size="48" color="green">mdi-cash-check</v-icon>
            <h2 class="mt-3 font-weight-bold black--text">ชำระเงิน</h2>
            <p class="grey--text">ตรวจสอบรายการก่อนยืนยันการชำระเงิน</p>
          </div>

          <v-card outlined class="pa-4 mb-6 custom-border" v-if="booking">
            <h3 class="mb-3">📋 รายละเอียดการจอง</h3>
            <p><strong>บริการ:</strong> {{ booking.service_name }}</p>
            <p><strong>วันที่:</strong> {{ booking.date }}</p>
            <p><strong>เวลา:</strong> {{ booking.time }} น.</p>

            <v-divider class="my-3"></v-divider>
            <p class="text-h6 mt-2">
              <strong>รวมทั้งหมด:</strong>
             <span class="blue--text font-weight-bold">{{ booking.price }} บาท</span>
            </p>
          </v-card>

          <h3 class="mb-3">💳 เลือกวิธีชำระเงิน</h3>
          <v-radio-group v-model="paymentMethod" class="mt-0">
            <v-radio label="พร้อมเพย์ (QR Code)" value="promptpay" color="green"></v-radio>
            <v-radio label="เงินสดหน้าร้าน" value="cash" color="green"></v-radio>
          </v-radio-group>
          <p class="black--text">ค่าที่เลือกตอนนี้คือ: {{ paymentMethod }}</p>
          <v-expand-transition>
  <div v-if="paymentMethod === 'promptpay'" class="text-center my-4 pa-4 white rounded-lg qr-box">
    <p class="font-weight-bold black--text mb-2">สแกนเพื่อชำระเงิน</p>
    
    <v-img
      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021129370016A000000677010111011300669999999995802TH53037645405250.00"
      max-width="200"
      class="mx-auto border-black"
    ></v-img>
    
    <p class="mt-2 blue--text font-weight-bold text-h6">{{ booking.price }} บาท</p>
  </div>
</v-expand-transition>

          <v-btn
            block
            x-large
            color="blue darken-1"
            dark
            class="mt-6 rounded-pill font-weight-bold"
            @click="confirmPayment"
          >
            ยืนยันการชำระเงิน
          </v-btn>

          <v-btn text block class="mt-2 black--text" @click="$router.back()">ย้อนกลับ</v-btn>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      booking: null,
      paymentMethod: ''
    }
  },

  mounted() {
    // แก้ไขจุดนี้: ดึงข้อมูลจาก localStorage ที่หน้า Booking บันทึกไว้
    const savedData = localStorage.getItem('booking_data')
    
    if (savedData) {
      this.booking = JSON.parse(savedData)
    } else {
      // ถ้าไม่มีข้อมูลในเครื่องจริงๆ ถึงจะเด้งเตือน
      alert('ไม่พบข้อมูลการจอง กรุณาทำรายการใหม่')
      this.$router.push('/summary')
    }
  },

 methods: {
  async confirmPayment() {
    if (!this.paymentMethod) {
      alert('กรุณาเลือกวิธีชำระเงิน');
      return;
    }

    try {
      // 1. ส่งข้อมูลไปบันทึกที่ Database ก่อน
      await this.$axios.post('payment.php', {
        service_id: this.booking.service_id,
        payment_method: this.paymentMethod,
        amount: this.booking.price,
        date: this.booking.date,
        time: this.booking.time
      });

      // 2. แสดงแจ้งเตือนเพื่อให้ผู้ใช้รับรู้ว่าจองสำเร็จแล้ว
      alert('บันทึกการชำระเงินเรียบร้อย 🐾');

      // 3. เคลียร์ข้อมูลการจองในเครื่อง
      localStorage.removeItem('booking_data');

      // 3. แจ้งเตือน และเคลียร์ข้อมูลการจองปัจจุบัน
      alert('บันทึกการชำระเงินเรียบร้อย 🐾');
      localStorage.removeItem('booking_data');

      // 4. เปลี่ยนไปหน้าสรุปการจองที่คุณจะสร้างใหม่
      this.$router.push('/summary'); 

    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  }
}
}
</script>

<style scoped>
/* พื้นหลังสีฟ้าตามที่คุณตั้งไว้ */
.v-card {
  background: #ffffff;
}

/* เส้นขอบสีดำให้ดูคมชัด */
.custom-border {
  border: 1.5px solid rgb(39, 27, 27) !important;
  background: rgb(201, 195, 195) !important; /* ให้ส่วนรายละเอียดเป็นสีขาวจะอ่านง่ายกว่า */
}

/* ปรับแต่ง Radio Button และตัวหนังสือ */
:deep(.v-label) {
  color: black !important;
  font-weight: 500;
}

:deep(.v-icon) {
  color: rgba(39, 140, 255, 0.7) !important;
}
:deep(.v-radio label) {
  color: black !important;
  opacity: 1 !important; /* เพิ่มความเข้ม */
  font-weight: 500;      /* เพิ่มความหนาเล็กน้อยให้อ่านง่าย */
}

/* แถม: ถ้าอยากให้หัวข้อ "เลือกวิธีชำระเงิน" ดำด้วย */
h3 {
  color: black !important;
}
.blue--text {
  color: #1E88E5 !important; /* สี Blue Darken-1 */
}

/* ทำให้ตัวหนังสือใน Radio Button เป็นสีดำ */
:deep(.v-radio label) {
  color: black !important;
  opacity: 1 !important;
}

/* ทำให้หัวข้อรายละเอียดการจองเป็นสีดำ */
h3 {
  color: black !important;
}
.qr-box {
  border: 1px solid black !important; /* ขอบดำบางๆ */
}
.border-black {
  border: 2px solid black; /* ขอบรูป QR Code */
}
</style>
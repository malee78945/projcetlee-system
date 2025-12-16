<template>
  <v-container fluid class="service-page-bg py-10">
    <v-card class="service-card mx-auto pa-5" max-width="1000" elevation="0"> 
    
      <h1 class="text-h4 mb-6 page-title">
        <v-icon large color="primary" class="mr-2">mdi-dog-service</v-icon>
        รายการบริการและแพ็กเกจจอง
      </h1>
      <v-divider class="mb-6"></v-divider>

      <v-data-table 
        :items="services" 
        :headers="headers" 
        class="elevation-0 service-table"
        hide-default-footer 
      >
        <template v-slot:item.actions="{ item}">
          <v-btn small color="primary" @click="addtocart(item)" class="select-btn">
            จอง
           </v-btn>
        </template>
        
      </v-data-table>
      
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProductListPage',
  data() {
    return {
      headers: [
        { text: 'รหัสบริการ', value: 'serviceID' },
        { text: 'ชื่อบริการ', value: 'name' },
        { text: 'ราคา (บาท)', value: 'price' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      services: [
        { serviceID: 'S001', name: 'อาบน้ำ (สุนัขเล็ก)', price: 300 },
        { serviceID: 'S002', name: 'ตัดขน (สุนัขใหญ่)', price: 750 },
        { serviceID: 'S003', name: 'แพ็กเกจอาบ+ตัด (แมว)', price: 600 },
        { serviceID: 'S004', name: 'รับเลี้ยง(สุนัข-แมว)', price: 800 },
      ],
    }
  },
  methods: {
    ...mapActions('cart', [
      'addtocart'
    ]), 
  },
}
</script>

<style scoped>
/* 1. พื้นหลังของทั้งหน้า: ใช้สีครีม/ฟ้าอ่อนพาสเทล */
.service-page-bg {
  background: #FAF3E0 !important; 
  min-height: 100vh; 
}

/* 2. Card หลักที่ครอบตาราง: ใช้สีขาว */
.service-card {
  background-color: #ffffff !important; 
  border-radius: 16px; 
  box-shadow: 0 12px 30px rgba(121, 180, 183, 0.3) !important;
}

/* 3. หัวข้อ: ใช้สี Primary พาสเทลเข้ม */
.page-title {
    color: #40798C !important;
}

/* 4. ปรับแต่งหัวตาราง (Headers) */
.service-table ::v-deep th {
  background-color: #A8E6CF !important; 
  font-weight: 600 !important; 
  color: #40798C !important; 
  font-size: 1.0em;
  border-bottom: none !important; 
}

/* สลับสีพื้นหลังแถวให้ดูน่ารัก */
.service-table ::v-deep tr:nth-child(even) {
    background-color: #f7fcfb !important;
}
.service-table ::v-deep tr:nth-child(odd) {
    background-color: #ffffff !important; 
}

/* ตั้งค่าสีตัวอักษรทั่วไปในตาราง */
.service-table ::v-deep td {
  color: #333 !important; 
  padding: 12px 16px !important;
  border-bottom: 1px solid #f0f0f0 !important;
}


/* สไตล์สำหรับปุ่มจอง */
.select-btn {
  background-color: #79B4B7 !important;
  color: white !important;
  font-weight: 600 !important;
  border-radius: 8px;
  transition: transform 0.2s;
}
.select-btn:hover {
    transform: translateY(-2px);
}


/* ปรับน้ำหนักและขนาดหัวตารางให้ดูดีขึ้น */
.service-table ::v-deep th {

  font-weight: 600 !important; /* ตัวหนาปานกลาง */
  font-size: 1.05em; /* เพิ่มขนาดหัวตารางเล็กน้อย */
}

/* ทำให้ชื่อบริการในตารางดูเด่นขึ้น */
.service-table ::v-deep td {
  font-size: 0.95em; 
}
</style>
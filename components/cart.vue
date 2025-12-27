<template>
  <v-container fluid class="service-page-bg py-10">
    <v-card class="service-card mx-auto pa-5" max-width="1000" elevation="15">
    
      <h1 class="text-h4 mb-6 text-center primary--text">
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
            <v-icon small left>mdi-cart-plus</v-icon>
            เลือกการจอง
          </v-btn>
        </template>
      </v-data-table>
      
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
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
      ],
    }
  },
  methods: {
    
    ...mapActions('cart', ['addtocart']), 
    

  },
}
</script>

<style scoped>
/* 1. พื้นหลังของทั้งหน้า: ใช้สีอ่อน/เทาอ่อน */
.service-page-bg {
  background: #f5f5f5 !important; 
  min-height: 100vh; 
}

/* 2. Card หลักที่ครอบตาราง: ใช้สีขาว */
.service-card {
  background-color: #FFFFFF !important; 
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1) !important;
}

/* 3. สีตัวอักษรหลักใน Card: ใช้สีดำเข้ม */
.service-card h1, .service-card, .service-table ::v-deep tr, .service-table ::v-deep td {
  color: #897979ff !important; 
}

/* 4. ปรับแต่งหัวตาราง (Headers): ใช้สีฟ้าอ่อนและตัวอักษรสีน้ำเงินเข้ม */
.service-table ::v-deep th {
  background-color: #E3F2FD !important; 
  font-weight: bold !important;
  color: #1565c0 !important; 
  font-size: 1.1em;
}

/* 5. Hover Effect */
.service-table ::v-deep tr:hover {
  background-color: #fce4ec !important; 
}

/* 6. ปรับปุ่มเลือกการจอง */
.select-btn {
  border-radius: 20px;
  font-weight: bold;
}
</style>

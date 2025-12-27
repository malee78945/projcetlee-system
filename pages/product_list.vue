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
      // 1. หัวข้อตารางสินค้า (Headers เดิมของคุณ)
      headers: [
        { text: 'รหัสบริการ', value: 'serviceID' },
        { text: 'ชื่อบริการ', value: 'name' },
        { text: 'ราคา (บาท)', value: 'price' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      // 2. หัวข้อตารางตะกร้าสินค้า (เพิ่มใหม่เพื่อทำ CRUD ตะกร้า)
      cartHeaders: [
        { text: 'ชื่อบริการ', value: 'name' },
        { text: 'ราคา', value: 'price' },
        { text: 'จำนวน', value: 'quantity', align: 'center' },
        { text: 'รวม', value: 'total' },
        { text: 'ลบ', value: 'delete_action', sortable: false },
      ],
      services: [
        { serviceID: 'S001', name: 'อาบน้ำ (สุนัขเล็ก)', price: 300 },
        { serviceID: 'S002', name: 'ตัดขน (สุนัขใหญ่)', price: 750 },
        { serviceID: 'S003', name: 'แพ็กเกจอาบ+ตัด (แมว)', price: 600 },
        { serviceID: 'S004', name: 'รับเลี้ยง(สุนัข-แมว)', price: 800 },
      ],
    }
  },


  computed: {
    cartItems() {
      return this.$store.state.cart.items || []
    },
    grandTotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },

  methods: {
    
    ...mapActions('cart', [
      'addtocart',
      'updateQty',
      'remove'
    ]),

    
    changeQty(item, n) {
      const newQty = item.quantity + n
      if (newQty > 0) {
        this.$store.dispatch('cart/updateQty', { serviceID: item.serviceID, quantity: newQty })
      }
    },

    
    async confirmOrder() {
      if (this.cartItems.length === 0) return alert('กรุณาเลือกบริการก่อนครับ');
      if (!confirm('ยืนยันการสั่งจองใช่หรือไม่?')) return;

      const payload = {
        total_price: this.grandTotal,
        items: this.cartItems
      };

      try {
       
        let result = await this.$axios.post('http://localhost/myfirst_nuxt_app_api-main/cart_save.php', payload);
        
        if (result.data.status) {
          alert('บันทึกข้อมูลการจองลงฐานข้อมูลสำเร็จ!');
          this.$store.commit('cart/CLEAR_CART'); // ล้างตะกร้าเมื่อบันทึกเสร็จ
        }
      } catch (error) {
        console.error(error);
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล');
      }
    }
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


.service-table ::v-deep th {
  background-color: #A8E6CF !important; 
  font-weight: 600 !important; 
  color: #40798C !important; 
  font-size: 1.0em;
  border-bottom: none !important; 
}


.service-table ::v-deep tr:nth-child(even) {
    background-color: #f7fcfb !important;
}
.service-table ::v-deep tr:nth-child(odd) {
    background-color: #ffffff !important; 
}

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



.service-table ::v-deep th {

  font-weight: 600 !important; 
  font-size: 1.05em; 
}

/* ทำให้ชื่อบริการในตารางดูเด่นขึ้น */
.service-table ::v-deep td {
  font-size: 0.95em; 
}
</style>
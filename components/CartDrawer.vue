<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    right
    temporary
    width="400"
    class="cart-drawer"
  >
    <v-list-item style="background-color: #79B4B7;"> 
      <v-list-item-content>
        <v-list-item-title class="text-h6 white--text">
          <v-icon dark class="mr-2">mdi-basket-fill</v-icon> ตะกร้าจอง ({{ itemCount }} รายการ)
        </v-list-item-title>
      </v-list-item-content>
      <v-btn icon dark @click="closeCart">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense class="pa-2" v-if="bookingItems.length > 0">
      <v-list-item v-for="(item, index) in bookingItems" :key="index" class="my-2 cart-item">
        
        <v-list-item-icon class="mr-3 align-self-start">
            <v-icon color="#F94C66">mdi-paw</v-icon> 
        </v-list-item-icon>
        
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">
            <v-icon x-small color="grey darken-1">mdi-tag</v-icon> {{ item.price.toLocaleString() }} บาท
            <br>
            <span v-if="item.bookingDate && item.bookingTime" class="success--text">
                <v-icon x-small color="#A8E6CF">mdi-calendar-check</v-icon> จอง: {{ item.bookingDate }}
            </span>
            <span v-else class="red--text">
                <v-icon x-small color="red">mdi-clock-alert</v-icon> ยังไม่ได้กำหนด วันที่/เวลา
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="align-self-start mt-2">
          <v-btn fab x-small color="#FFD3B5" elevation="0" @click="removeFromCart(index)">
            <v-icon small color="#D7385E">mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-card flat class="pa-4 text-center" v-else>
        <v-icon large color="grey lighten-1">mdi-basket-off</v-icon>
        <p class="mt-3">ตะกร้าจองว่างเปล่า</p>
        <v-btn text color="#79B4B7" @click="closeCart">เลือกบริการ</v-btn>
    </v-card>

    <template v-slot:append>
      <div class="pa-4 total-section">
        <v-row no-gutters class="font-weight-bold text-h6">
          <v-col>รวมทั้งสิ้น:</v-col>
          <v-col class="text-right" style="color: #40798C !important;">{{ totalPrice.toLocaleString() }} บาท</v-col>
        </v-row>
        <v-btn color="#A8E6CF" block large class="mt-3" :disabled="bookingItems.length === 0">
          <span style="color: #40798C; font-weight: bold;">ดำเนินการชำระเงิน</span>
        </v-btn>
      </div>
    </template>

  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', {
        bookingItems: 'getbookingitems',
        totalPrice: 'getTotalPrice',
        isCartOpen: 'isCartOpen',
        itemCount: 'itemCount',
    }),
    
    drawer: {
      get() {
        return this.isCartOpen;
      },
      set(value) {
        if (!value) {
          this.closeCart();
        }
      }
    }
  },
  methods: {
    ...mapActions('cart', ['closeCart', 'removeFromCart']),
  }
}
</script>

<style scoped>
.cart-item {
    border-radius: 8px;
    background-color: #fcfcfc;
}
.total-section {
    border-top: 2px solid #e0e0e0;
}

/* *** โค้ด CSS ที่เพิ่มเข้ามาเพื่อให้ตัวหนังสือดูสวยขึ้น *** */
.v-list-item-title.font-weight-bold {
    font-weight: 600 !important; /* ใช้ตัวหนา 600 */
    font-size: 1.05rem;
}

.total-section .text-h6 {
    font-size: 1.5rem !important; /* ใหญ่ขึ้น */
    font-weight: 700 !important; /* หนามาก */
}
</style>
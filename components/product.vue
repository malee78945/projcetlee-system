<template>
  <div>
    <v-data-table :items="product" :headers="headers">
      <template v-slot:item.actions="{ item }">
        <v-btn small color="primary" @click="addToCart(item)">
          Add to Cart
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      headers: [
        { text: 'ประเภท', value: 'productID' },
        { text: 'รายการ', value: 'name' },
        { text: 'จำนวน', value: 'type' },
        { text: 'ราคา', value: 'price' },  
        { text: 'Actions', value: 'actions', sortable: false },

      ],
      product: [
        { productID: 'ตัดขน', name: 'หมาเล็ก', price: 30000 },
        { productID: 'อาบน้ำ', name: 'IPhone 15', price: 40000 },
        { productID: 'ตัดเล็บ', name: 'IPhone 16', price: 50000 },
        

      ],
    }
  },
  methods: {
    ...mapActions({
      setName: 'cart/setName',
    }),
    addToCart(item) {
      this.setName({ productID: item.productID })
    },
  },
}
</script>


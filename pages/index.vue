<template>
  <v-container fluid class="pa-6">
    <v-row>
      <v-col cols="12" md="8">
        <ProductList /> 
      </v-col>

      <v-col cols="12" md="4">
        <CartSummary /> 
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import ProductList from '@/components/cart.vue' 
import CartSummary from '@/components/CartSummary.vue'

export default {
  components: {
    
    ProductList, 
    CartSummary
  }
}
</script>
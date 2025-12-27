<template>
  <v-app> <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      
      <v-btn icon @click="openCart">
        <v-badge 
          :content="itemCount" 
          :value="itemCount > 0" 
          color="error" 
          overlap
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      
    </v-app-bar>
    
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    
    <CartDrawer />
    
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import CartDrawer from '~/components/CartDrawer.vue'; 
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DefaultLayout',
  components: {
    CartDrawer, 
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
  items: [
    { icon: 'mdi-home', title: 'หน้าแรก', to: '/product_list' }, 
    { icon: 'mdi-cart', title: 'ตะกร้า', to: '/' },
    { icon: 'mdi-chart-bubble', title: 'Inspire', to: '/inspire' },
    
],

      miniVariant: false,
      title: 'การจองบริการสัตว์เลี้ยง',
    }
  },
  computed: {
    ...mapGetters('cart', ['itemCount']), 
  },
  methods: {
    ...mapActions('cart', ['openCart']), 
  }
}
</script>
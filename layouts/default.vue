<template>
  <v-app>
    <!-- MAIN CONTENT -->
    <v-main>
      <Nuxt />
    </v-main>

    <!-- FOOTER ONLY -->
    <v-footer padless color="#f5f7fb">
      <v-col
        cols="12"
        class="text-center grey--text text--darken-1 py-6"
      >
        © {{ new Date().getFullYear() }} —
        <strong class="blue--text">
          Pet Grooming Booking
        </strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<style scoped>
.v-main {
  background: #f5f7fb;
}
</style>

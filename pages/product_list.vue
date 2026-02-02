<template>
  <v-container class="py-10">

    <h1 class="font-weight-bold mb-8 blue--text">
  🐶 บริการของเรา
</h1>

    <v-row>
      <v-col
        v-for="item in services"
        :key="item.id"
        cols="12"
        md="4"
      >
        <v-card class="rounded-xl elevation-6">

          <!-- IMAGE -->
          <v-img
            :src="item.image"
            height="220"
            cover
          />

          <!-- TITLE -->
          <v-card-title class="font-weight-bold">
            {{ item.name }}
          </v-card-title>

          <!-- CONTENT -->
          <v-card-text>
            <p class="grey--text">
              {{ item.description }}
            </p>

            <p class="font-weight-bold mt-2">
              ราคา {{ item.price }} บาท
            </p>
          </v-card-text>

          <!-- ACTION -->
          <v-card-actions>
            <v-btn
              block
              color="blue darken-1"
              dark
              rounded
              @click="goBooking(item.id)"
            >
              จองบริการ
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data () {
    return {
      services: []
    }
  },

  async mounted () {
    try {
      const res = await this.$axios.get('get_services.php')
      console.log('SERVICES = ', res.data)

      // 🔥 backend ส่ง array ตรง ๆ
      this.services = res.data

    } catch (error) {
      console.error(error)
      alert('โหลดบริการไม่สำเร็จ')
    }
  },

  methods: {
    goBooking (serviceId) {
      this.$router.push({
        path: '/booking',
        query: { service_id: serviceId }
      })
    }
  }
}
</script>

<style scoped>
.v-card {
  background: #f8fbff;
}
</style>

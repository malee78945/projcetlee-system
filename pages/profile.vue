<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="rounded-xl overflow-hidden elevation-3 border-light-blue">
          <div class="blue lighten-5 pa-10 text-center">
            <v-avatar size="120" class="elevation-4 border-white mb-4">
              <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img> 
            </v-avatar>
            <h2 class="font-weight-bold blue--text text--darken-4">คุณสมชาย ใจดี</h2>
            <p class="blue--text text--lighten-1 mb-0">Member ID: PET-889</p>
          </div>

          <v-card-text class="pa-8 bg-white">
            <v-row>
              <v-col cols="12" sm="6">
                <div class="grey--text text--lighten-1 caption">อีเมล</div>
                <div class="subtitle-1 font-weight-medium">somchai@email.com</div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="grey--text text--lighten-1 caption">เบอร์โทรศัพท์</div>
                <div class="subtitle-1 font-weight-medium">081-234-5678</div>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <div class="d-flex justify-center flex-column align-center">
              <v-btn rounded color="blue darken-1" dark large class="px-10 mb-3" block>
                <v-icon left>mdi-pencil</v-icon> แก้ไขข้อมูลส่วนตัว
              </v-btn>
              
              <v-btn rounded outlined color="red darken-1" block @click="logout">
                <v-icon left>mdi-logout</v-icon> ออกจากระบบ
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    logout() {
      // หากมีระบบ Auth ให้ทำการ Clear Token ที่นี่
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.border-white { border: 4px solid white !important; }
.border-light-blue { border: 1px solid #E3F2FD !important; }
</style>
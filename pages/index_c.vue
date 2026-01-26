<template>
  <!-- ================= TOP AUTH BAR ================= -->
 

  <div>
     <div class="d-flex justify-end pa-4">
  <v-btn
    color="red lighten-1"
    outlined
    rounded
    @click="logout"
  >
    <v-icon left>mdi-logout</v-icon>
    ออกจากระบบ
  </v-btn>
</div>


    <!-- ================= HERO SECTION ================= -->
    <v-sheet
      class="hero-section d-flex align-center"
      height="85vh"
    >
      <v-container>
        <v-row align="center">

          <!-- LEFT CONTENT -->
          <v-col cols="12" md="6">
            
            <span class="hero-badge">
              🐾 บริการดูแลสัตว์เลี้ยงครบวงจร
            </span>

            <h1 class="hero-title mt-6">
              ดูแลน้องหมา<br />
              อย่างมืออาชีพ<br />
              ด้วยความใส่ใจ
            </h1>

            <p class="hero-subtitle mt-6">
              บริการอาบน้ำ ตัดขน และสปาน้องหมา
              ด้วยผลิตภัณฑ์คุณภาพ ปลอดภัย และได้มาตรฐาน
            </p>

            <div class="mt-10 d-flex flex-wrap">
              <v-btn
                color="blue"
                large
                rounded
                class="mr-4 px-8 mb-3"
                to="/product_list"
              >
                จองบริการตอนนี้
              </v-btn>

              <v-btn
                outlined
                large
                rounded
                color="blue"
                class="px-8 mb-3"
                to="/shop"
              >
                สั่งซื้อสิ้นค้าอื่นๆ
              </v-btn>
            </div>
          </v-col>

          <!-- RIGHT IMAGE -->
          <v-col cols="12" md="6" class="text-center">
            <v-img
              src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8"
              max-width="420"
              class="hero-image mx-auto"
              contain
            />
          </v-col>

        </v-row>
      </v-container>
    </v-sheet>

    <!-- ================= TRUST SECTION ================= -->
    <v-container class="py-14">
      <v-row justify="center" class="text-center">

        <v-col cols="12" md="3">
          <v-icon size="44" color="blue">mdi-shield-check</v-icon>
          <h3 class="mt-4 font-weight-bold">ปลอดภัย ได้มาตรฐาน</h3>
          <p class="mt-2 grey--text">
            ใช้ผลิตภัณฑ์อ่อนโยน ไม่ระคายเคือง
          </p>
        </v-col>

        <v-col cols="12" md="3">
          <v-icon size="44" color="blue">mdi-dog-service</v-icon>
          <h3 class="mt-4 font-weight-bold">ผู้เชี่ยวชาญด้านสัตว์เลี้ยง</h3>
          <p class="mt-2 grey--text">
            ดูแลน้องหมาโดยผู้มีประสบการณ์
          </p>
        </v-col>

        <v-col cols="12" md="3">
          <v-icon size="44" color="blue">mdi-calendar-check</v-icon>
          <h3 class="mt-4 font-weight-bold">จองง่าย สะดวก</h3>
          <p class="mt-2 grey--text">
            เลือกวันและเวลาได้ทันที
          </p>
        </v-col>

      </v-row>
    </v-container>
    
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  head () {
    return {
      title: 'Pet Grooming | บริการอาบน้ำน้องหมา',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'บริการอาบน้ำ ตัดขน และสปาน้องหมา ดูแลด้วยความใส่ใจ ปลอดภัย ได้มาตรฐาน'
        }
      ]
      
    }
  }
  ,  mounted() {
    const user = localStorage.getItem('user')
    if (!user) {
      this.$router.push('/login')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }

}

</script>

<style scoped>
  /* ================= TOP AUTH BAR ================= */

.top-auth-bar {
  position: absolute;
  top: 24px;
  right: 32px;
  z-index: 10;
  display: flex;
  align-items: center;
}

/* MOBILE */
@media (max-width: 600px) {
  .top-auth-bar {
    right: 16px;
    top: 16px;
  }
}

/* ================= HERO ================= */
.hero-section {
  background: linear-gradient(
    135deg,
    #f5f7fb 0%,
    #e8effa 100%
  );
}

.hero-badge {
  display: inline-block;
  background: #e3f2fd;
  color: #1e88e5;
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.15;
  color: #1e3a8a;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #4b5563;
  max-width: 520px;
}

/* IMAGE */
.hero-image {
  border-radius: 32px;
  filter: drop-shadow(0 30px 40px rgba(0, 0, 0, 0.15));
}

/* ================= RESPONSIVE ================= */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.3rem;
  }

  .hero-section {
    height: auto;
    padding: 80px 0;
  }
}
</style>

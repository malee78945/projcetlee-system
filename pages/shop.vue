<template>
  <v-container>
    <!-- Banner -->
    <v-card class="banner mb-6">
      <v-card-text class="text-center">
        <h2 class="banner-title">🐶 Pet Grooming Shop</h2>
        <p class="banner-subtitle">
          ซื้อสินค้า ดูแลน้องหมา พร้อมจองคิวอาบน้ำ
        </p>
      </v-card-text>
    </v-card>

    <!-- Category -->
    <v-chip-group
      v-model="selectedCategory"
      row
      active-class="chip-active"
    >
      <v-chip
        v-for="cat in categories"
        :key="cat"
        class="category-chip"
        outlined
      >
        {{ cat }}
      </v-chip>
    </v-chip-group>

    <!-- Product List -->
    <v-row class="mt-6">
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="product-card">
          <v-img
            :src="product.image"
            height="200"
            cover
            class="product-image"
          />

          <v-card-title class="product-title">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle class="product-price">
            {{ product.price }} บาท
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              class="btn-cart"
              block
              @click="addToCart(product)"
            >
              เพิ่มลงตะกร้า
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-btn
              text
              class="btn-booking"
              block
              @click="buyWithBooking(product)"
            >
              ซื้อพร้อมจอง
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* ===== Banner ===== */
.banner {
  background: linear-gradient(135deg, #e3f2fd, #fce4ec);
  border-radius: 18px;
}

.banner-title {
  color: #1976d2;
  font-weight: bold;
}

.banner-subtitle {
  color: #555;
  font-size: 15px;
}

/* ===== Category ===== */
.category-chip {
  color: #555;
  border-color: #90caf9;
}

.chip-active {
  background-color: #1976d2 !important;
  color: #ffffff !important;
}

/* ===== Product Card ===== */
.product-card {
  background-color: #ffffff;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.product-image {
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}

.product-title {
  font-size: 17px;
  font-weight: bold;
  color: #333;
}

.product-price {
  font-size: 16px;
  color: #e91e63;
  margin-left: 16px;
}

/* ===== Buttons ===== */
.btn-cart {
  background-color: #1976d2;
  color: #ffffff;
  border-radius: 12px;
  font-weight: bold;
}

.btn-booking {
  color: #2e7d32;
  font-weight: bold;
}
</style>

<script>
export default {
  name: 'ShopPage',
  data () {
    return {
      selectedCategory: 0,
      categories: [
        'ทั้งหมด',
        'อาบน้ำ & ดูแลขน',
        'ขนมสุนัข',
        'อุปกรณ์'
      ],
      products: [
        {
          id: 1,
          name: 'แชมพูสุนัข สูตรอ่อนโยน',
          price: 250,
          category: 'อาบน้ำ & ดูแลขน',
          image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e'
        },
        {
          id: 2,
          name: 'ครีมนวดขนสุนัข',
          price: 220,
          category: 'อาบน้ำ & ดูแลขน',
          image: 'https://obs-ect.line-scdn.net/r/ect/ect/image_1707645109442705543b579379t1304bfa5'
        },
        {
          id: 3,
          name: 'สเปรย์ดับกลิ่นสุนัข',
          price: 180,
          category: 'อาบน้ำ & ดูแลขน',
          image: 'https://f.ptcdn.info/962/048/000/okn67lnkw0z8iQ81tKQ-o.jpg'
        },
        {
          id: 4,
          name: 'ขนมขัดฟัน',
          price: 120,
          category: 'ขนมสุนัข',
          image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8'
        },
        {
          id: 5,
          name: 'ขนมสุนัขเพื่อสุขภาพ',
          price: 150,
          category: 'ขนมสุนัข',
          image: 'https://images.unsplash.com/photo-1625321171045-1fea4ac688e9'
        },
        {
          id: 6,
          name: 'วิตามินบำรุงขนและผิว',
          price: 320,
          category: 'ขนมสุนัข',
          image: 'https://cf.shopee.co.th/file/b5db5b8ba98caf2462fed4913ac02cdd'
        },
        {
          id: 7,
          name: 'แปรงหวีขนสุนัข',
          price: 190,
          category: 'อุปกรณ์',
          image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993'
        },
        {
          id: 8,
          name: 'กรรไกรตัดเล็บสุนัข',
          price: 210,
          category: 'อุปกรณ์',
          image: 'https://www.petsuka.com/wp-content/uploads/2020/08/Pet-Nail-L.png'
        },
        {
          id: 9,
          name: 'ทิชชู่เปียกสำหรับสัตว์เลี้ยง',
          price: 99,
          category: 'อุปกรณ์',
          image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'
        }
      ]
    }
  },
  computed: {
    filteredProducts () {
      if (this.selectedCategory === 0) {
        return this.products
      }
      return this.products.filter(
        p => p.category === this.categories[this.selectedCategory]
      )
    }
  },
  methods: {
    addToCart (product) {
      console.log('เพิ่มสินค้า:', product)
      // ตัวอย่างต่อ Vuex
      // this.$store.dispatch('cart/addItem', product)
      alert(`เพิ่ม ${product.name} ลงตะกร้าแล้ว`)
    },
    buyWithBooking (product) {
      this.$router.push({
        path: '/booking',
        query: { product_id: product.id }
      })
    }
  }
}
</script>

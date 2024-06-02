<template>
  <div class="home-wrapper">
    <MyNavBar />

    <section>
      <div class="grid">
        <div class="content">
          <div class="content-left">
            <div class="info">
              <h2>Order Your Best Delicious Food</h2>
              <p>Hey, Our delicious food is waiting for you,<br>
                We are always near to you with fresh item of food
              </p>
            </div>
            <button @click="menu">Order Now!</button>
          </div>
          <div class="content-right">
            <img src="@/assets/image/plate.png" alt="dashboard pic">
          </div>
        </div>
      </div>
    </section>

    <div class="category">
      <div class="list-items">
        <h3>Popular Dishes</h3>
        <div class="card-list">
          <div class="card" v-for="(dish, index) in dishes" :key="index">
            <img :src="dish.image" :alt="dish.title">
            <div class="food-title">
              <h1>{{ dish.title }}</h1>
            </div>
            <div class="desc-food">
              <p>{{ dish.description }}</p>
            </div>
            <div class="price">
              <span>{{ dish.price }}</span>
              <span>
                <i class='bx bxs-star icon-col' v-for="star in 3" :key="star"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyNavBar from './NavBar.vue'

export default {
  name: 'HomeWrapper',
  components: {
    MyNavBar
  },
  data() {
    return {
      dishes: [
        {
          title: "Fluffy Delight Pancakes",
          description: "Incredibly light, airy, and soft, creating a delightful melt-in-your-mouth experience with every bite.",
          price: "RM 18.00",
          image: require('@/assets/image/food2.jpg')
        },
        {
          title: "Satay Chicken Vege",
          description: "Experience the richness of our Lobster Bisque. This velvety soup is crafted with the finest lobster meat.",
          price: "RM 18.00",
          image: require('@/assets/image/food3.jpg')
        },
        {
          title: "Oat Chicken Moroccan Salad",
          description: "Delicious baked chicken coated with oats then it is glazed by hot sauce.",
          price: "RM 18.00",
          image: require('@/assets/image/food4.jpg')
        },
        {
          title: "Pesto Salmon Vege",
          description: "Fresh aroma with a subtle of peppery flavor sweet basil with olive oil and garlic coated salmon.",
          price: "RM 23.00",
          image: require('@/assets/image/food5.jpg')
        }
      ]
    }
  },
  methods: {
    menu() {
      window.location.href = "./login.php";
    }
  }
}
</script>

<style scoped>
@import '../assets/css/home.css';

/* Add additional styles here if needed */
</style>

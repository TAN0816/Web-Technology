

<template>
  <nav class="nav">
    <div class="nav-logo">
      <p>Food.io</p>
    </div>

    <div class="nav-menu">
      <ul>
        <li><router-link to="/" class="link" :class="{ active: isActive('/') }">Home</router-link></li>
        <li><router-link to="/user/MenuCart" class="link" :class="{ active: isActive('/user/MenuCart') }">Menu</router-link></li>
        <li>
          <div class="nav-menu-btn">
            <router-link to="/cart" class="link">
              <i class='bx bx-cart'></i>
              Cart
            </router-link>
          </div>
        </li>
        <li><router-link to="/order" class="link" :class="{ active: isActive('/order') }">Order</router-link></li>
      </ul>
    </div>

    <div class="nav-button">
      <button class="loginBtn" @click="navigateTo('login')">Sign In</button>
      <button class="registerBtn" @click="navigateTo('register')">Sign Up</button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(`/${route}`);
    },
    isActive(route) {
      return this.$route.path === route;
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>

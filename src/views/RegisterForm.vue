<template>
  <div class="wrapper">
    <NavBar></NavBar>
    <div class="container">
      <div class="box form-box">
        <div class="right">
          <header>Sign Up</header>
          <form @submit.prevent="register">
            <div class="field input label-left">
              <label for="username">Username</label>
              <input type="text" v-model="username" id="username" placeholder="Username" required>
            </div>
            <div class="field input label-left">
              <label for="email">Email</label>
              <input type="email" v-model="email" id="email" placeholder="@gmail.com" autocomplete="off" required>
            </div>
            <div class="field input label-left">
              <label for="password">Password</label>
              <input type="password" v-model="password" id="password" placeholder="Password" minlength="8" required>
            </div>
            <div class="field">
              <input type="submit" value="Register" class="logbtn">
            </div>
            <div class="links">
              Already have an account? <router-link to="/login">Sign In</router-link>
            </div>
          </form>
        </div>
        <div class="left">
          <img src="@/assets/image/food.jpg" alt="Food image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          })
        });
        const result = await response.json();
        if (result.success) {
          Swal.fire({
            icon: 'success',
            title: 'Registration successful!',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'success-popup'
            }
          }).then(() => {
            this.$router.push('/login');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: result.message || 'An error occurred. Please try again.',
            confirmButtonColor: '#d33',
            timer: 3000
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred fetching. Please try again.',
          confirmButtonColor: '#d33',
          timer: 3000
        });
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/loginRegister.css';

/* Add additional styles here if needed */

/* Custom Success Popup */
.success-popup {
  background-color: #4CAF50 !important;
  color: white !important;
}


</style>

<template>
  <div class="wrapper">
    <NavBar></NavBar>
    <div class="container">
      <div class="box form-box">
        <div v-if="message" class="message">
          <p>{{ message }}</p>
        </div>
        <div class="left">
          <img src="@/assets/image/nice.jpg" alt="Food image">
        </div>
        <div class="right">
          <header>Login</header>
          <form @submit.prevent="login">
            <div class="field input label-left">
              <label for="email">Email</label>
              <input type="email" v-model="email" id="email" placeholder="Email" required>
            </div>
            <div class="field input label-left">
              <label for="password">Password</label>
              <input type="password" v-model="password" id="password" placeholder="Password" required>
            </div>
            <div class="field">
              <input type="submit" value="Login" class="logbtn">
            </div>
            <div class="links">
              Don't have an account? <router-link to="/register">"Sign Up Now!"</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Swal from 'sweetalert2';

export default{
  data(){
    return{
      email:'',
      password:'',
      message:''
    }
  },
  methods:{
    async login(){
      try{
        const response=await fetch('http://localhost:8080/login',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            email: this.email,
            password:this.password
          })
        });
        const result=await response.json();
        if(result.success){
          this.message=''; //Clear any previous error message
          if(result.role === 'admin'){
            this.$router.push('/admin/dashboard');
          }else{
            this.$router.push('/home');
          }
        }else{
          this.message='';
          Swal.fire({
            icon: 'error',
            title:'Oops....',
            text: result.message || 'Wrong Email or Password',
            confirmButtonColor: '#d33'
          });
        }
      } catch (error){
        this.message= '';
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred. Please try again',
          confirmButtonColor: '#d33'
        })
      }
    }
  }
}

</script>

<style scoped>
@import "../assets/css/loginRegister.css";

</style>
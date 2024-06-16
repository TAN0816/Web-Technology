<template>
  <div class="wrapper">
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

@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,500&display=swap');

*{
  padding: 0;
  margin:0;
  box-sizing:border-box;
  font-family:'Poppins', sans-serif;
}

body{
  background: whitesmoke;
}

.wrapper{
  display:flex;
  justify-content: center;
  align-items: center;
  min-height: 110vh;
}

.nav{
  position:fixed;
  top:0;
  display:flex;
  justify-content:space-around;
  width:100%;
  height:100px;
  line-height:100px;
  z-index:100;
  background: #ffffff;
}

.nav-logo p{
  color:rgb(255, 164, 170);
  font-size: 25px;
  font-weight: 600;
  
}

.nav-logo b{
  color:blueviolet;
}
.nav-menu ul{
  display:flex;
}

.nav-menu ul li{
  list-style-type: none;
}

.nav-menu ul li .link{
  text-decoration: none;
  font-weight: 500;
  color:black;
  padding-bottom: 15px;
  margin:0 25px;
}

.link:hover, .active{
  border-bottom:2px solid#fc6027;
  
}

.loginBtn, .registerBtn{
  width:130px;
  height:40px;
  font-weight:200;
  background:rgba(255, 232, 204, 0.6);
  color:black;
  border:none;
  border-radius:30px;
  cursor:pointer;
  transition: .3s ease;
}

.loginBtn:hover, .registerBtn:hover{
  background-color: #ff9a75;
}

#registerBtn{
  margin-left:15px;
}

.container{
  display:flex;
  align-items: center;
  justify-content:center;
  min-height:90vh;
}

.box{
  background:#ffecd7;
  display:flex;
  flex-direction: row;
  padding:25px 25px;
  border-radius:20px;
  box-shadow:0 0 128px 0 rgba(0,0,0,0.1),
            0 32px 64px -48px  rgba(0,0,0,0.5);
}


.left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left img {
  max-width: 100%;
  max-height: 100%;
}



.right {
  flex: 1;
  padding: 0 20px;
  
}

.form-box{
  width:700px;
  margin:0px 10px;
  
}

.form-box header{
  font-size:25px;
  font-weight:600;
  padding-bottom:10px;
  border-bottom:1px solid #83756a;
  margin-bottom:10px;
  text-align: left;

}

.form-box form .field{
  display:flex;
  margin-bottom:20px;
  flex-direction:column;
}

.form-box form .input input{
  height:40px;
  width:100%;
  font-size:16px;
  padding: 0 10px;
  border-radius:5px;
  border:1px solid #ccc;
  outline:none;
}

.logbtn, .btn{
  height:35px;
  background: #f1916e;
  color:white;
  border:none;
  border-radius:5px;
  font-size:16px;
  padding: 0 10px;
  cursor:pointer;
  transition:all .3s;
  margin-top:10px;
  padding:0px 10px;
}

.logbtn:hover{
  opacity:0.52; 
}

.submit{
  width:100px;
}

.link{
  margin-bottom:15px;
  
}

.message{
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  text-align:center;
  background:#fad8a9;
  padding: 10px 10px;
  margin:10px;
  border:1px solid #423b36;
  border-radius:5px;
  margin-bottom:10px;
  margin-top: 5px;
  margin-left: 20px;
  color:rgb(20, 1, 1);
}

.popup {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: red;
  color: white;
  border-radius: 5px;
  z-index: 1000;
  display: none;
}

.popup.show {
  display: block;
}



/* Align form content to the left */
.right {
  flex: 1;
  padding: 0 20px;
}

/* Add this style to align the label to the left */
.form-box form .field.label-left label {
  text-align: left;
}

.form-box form .links{
  text-align: left;
  font-size: 15px;

}

/* Add additional styles here if needed */

/* Custom Success Popup */
.success-popup {
  background-color: #4CAF50 !important;
  color: white !important;
}


</style>

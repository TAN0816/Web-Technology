

<template>
  <nav class="nav">
    <div class="nav-logo">
      <p>Food.io</p>
    </div>

    <div class="nav-menu">
      <ul>
        <li><router-link to="/" class="link" :class="{ active: isActive('/') }">Home</router-link></li>
        <li>
          <router-link to="/login" class="link">
            Menu & <i class="bx bx-cart"></i> Cart
          </router-link>
        </li>
        <li><router-link to="/login" class="link" >Order</router-link></li>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,500&display=swap');

*{
  padding: 0;
  /*margin:0;
  box-sizing:border-box;
  font-family:'Poppins', sans-serif;*/
}

body{
  background: whitesmoke;
  
}

.wrapper{
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  margin:0;
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
  margin:0;

}

.nav-logo p{
  color:rgb(255, 164, 170);
  font-size: 25px;
  font-weight: 600;
  margin:0;
}

.nav-logo b{
  color:rgb(30, 94, 88);
  margin:0;
}
.nav-menu ul{
  display:flex;
  margin:0;
  font-family:'Poppins', sans-serif;
}

.nav-menu ul li{
  list-style-type: none;
  margin:0;
  font-family:'Poppins', sans-serif;
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
   cursor: pointer;
  transition: .3s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center; 
  
}

.loginBtn {
  margin-right: 10px;
}
.loginBtn:hover, .registerBtn:hover{
  background-color: #ff9a75;
}

#registerBtn{
  margin-left:15px;
}

.dropdown img, .dropdown p{
  width: 35px;
  display: inline;
  cursor: pointer;
}
.dropdown{
  display: flex;
  align-items: center;
  background-color: white;
  height: 100px;
  width: 100px;
  font-weight: 100;
  font-family:'Poppins', sans-serif;

}

.account{
  margin-right: 50px;
}
.dropdown-item{
  position: absolute;
  top: 70px;
  height: 0;
  width: 100px;
  z-index: 999;
  transition: height 0.3s linear;
  transition-delay: 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: rgb(255, 198, 164);
  border-radius: 10px;
  right: 140px;
}
.dropdown:hover .dropdown-item{
  transition: height 0.3s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: rgb(255, 198, 164);
  border-radius: 10px;
}
.customerlogout{
  text-decoration: none;
  color: black;
  
}
</style>

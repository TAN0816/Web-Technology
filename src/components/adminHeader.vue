<template>
    <div class="aHeader-container">
        <div class="logo-container">
            <p>Food<span>.io</span></p>
        </div>
        <ul class="nav-content">
            <li><router-link to="/admin/dashboard" :class="{ active: isActive('/admin/dashboard')}" >Admin Dashboard</router-link></li>
            <li><router-link to="/admin/menuManage" :class="{ active: isActive('/admin/menuManage')}" >Menu Management</router-link></li>
            <li><router-link to="/admin/orderManage" :class="{ active: isActive('/admin/orderManage')}" >Order Management</router-link></li>
            <li><router-link to="/admin/userManage" :class="{ active: isActive('/admin/userManage')}" >User Management</router-link></li>
        </ul>
        <div class="account">
            <div class="dropdown">
                <img src="../assets/image/login.png" alt="login-pic" @click="goToProfile" />
                <p @click="goToProfile"><span style="text-decoration: none; color: black;">Admin</span></p>

                <div class="dropdown-item">
                    <button class="adminlogout" @click="logout"><i class="bi bi-box-arrow-left"></i><span>Log
                            Out</span></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    goToProfile() {
      this.$router.push('/profile');
    },
    logout() {
      localStorage.removeItem('role');
      localStorage.removeItem('userid');
      window.location.href = '/login';
    },
    isActive(route) {
      return this.$route.path === route;
    }
  },
};
</script>

<style scoped>
* {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
}

.aHeader-container {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    margin: 20px 0 0 0;
}

.logo-container {
    display: flex;
    justify-content: center;
    width: auto;
    height: 100%;
    margin: 0 50px;
    align-items: center;
    font-weight: 600;
}

.logo-container p {
    color: rgb(255, 164, 170);
    font-size: 25px;
    font-weight: 600;
    margin: 0;
}

.logo-container span {
    color: rgb(255, 164, 170);
    font-size: 25px;
    margin: 0;
}

.nav-content {
    display: flex;
    list-style: none;
    height: 100%;
    margin: 0;
    padding: 0 20px;
    align-items: center;
}

.nav-content li {
    padding: 0 20px;
}

.nav-content li a {
    position: relative;
    text-decoration: none;
    color: black;
    padding-bottom: 15px;
}

.nav-content li a:hover, .active {
    /*text-decoration: none;
    color: rgb(247, 147, 152);*/
    border-bottom: 2px solid #FF6384;
}

.dropdown img,
.dropdown p {
    width: 35px;
    display: inline;
    cursor: pointer;
    margin: 0;
}

.dropdown {
    display: flex;
    align-items: center;
    background-color: transparent;
    height: 50px;
    width: 100px;
    position: relative;
}

.account {
    margin-left: auto;
    margin-right: 50px;
}

.dropdown-item {
    position: absolute;
    top: 50px;
    right: 0;
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
}

.dropdown:hover .dropdown-item {
    transition: height 0.3s linear;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
}

.adminlogout {
    text-decoration: none;
    color: black;
    border: none;
    background: transparent;
}
</style>
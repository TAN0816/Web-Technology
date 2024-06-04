<script>

</script>

<template>
    <div class="aHeader-container">
        <div class="logo-container">
            <p>Food<span>.io</span></p>
        </div>
        <ul class="nav-content">
            <li><router-link to="/admin/dashboard">Admin Dashboard</router-link></li>
            <li><router-link to="/admin/menuManage">Menu Management</router-link></li>
            <li><router-link to="/admin/orderManage">Order Management</router-link></li>
            <li><router-link to="/admin/userManage">User Management</router-link></li>
        </ul>
        <div class="account">
            <div class="dropdown">
                <img src="../assets/image/login.png" alt="login-pic" />
                <p>Admin</p>

                <div class="dropdown-item">
                    <a href="../logout.php" class="adminlogout"><i class="bi bi-box-arrow-left"></i><span>Log
                            Out</span></a>
                </div>
            </div>
        </div>
    </div>
</template>

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
}

.nav-content li a:hover {
    text-decoration: none;
    color: rgb(247, 147, 152);
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
    background-color: white;
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
    background-color: rgb(162, 205, 255);
    border-radius: 10px;
}

.dropdown:hover .dropdown-item {
    transition: height 0.3s linear;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background-color: rgb(162, 205, 255);
    border-radius: 10px;
}

.adminlogout {
    text-decoration: none;
    color: black;
}
</style>
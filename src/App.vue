<template>

  <header>
    <nav v-if="role === 'admin'">
      <AdminHeader />
    </nav>
    <nav v-else-if="role === 'customer'">
      <UserHeader />
    </nav>
    <nav v-else>
      <GuestHeader />
    </nav>
  </header>

  <RouterView />
</template>

<script>

export default {
  data() {
    return {
      role: null,
    };
  },
  mounted() {
    this.role = localStorage.getItem('role');
    console.log(this.role);
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

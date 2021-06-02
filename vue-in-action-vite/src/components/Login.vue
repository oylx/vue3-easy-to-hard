<template>
  <div>
    <button @click="onLogin">登录</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    onLogin() {
      localStorage.setItem('token', 'some token');
      this.$router.push(this.$route.query.redirect);
    },
  },
};
</script>

<style scoped>

</style>

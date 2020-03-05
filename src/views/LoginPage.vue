<template>
  <v-app id="inspire">
    <LoginComponent></LoginComponent>
  </v-app>
</template>

<script>
import LoginComponent from '@/components/LoginComponent';

export default {
  name: 'LoginPage',
  components: {
    LoginComponent,
  },
};
</script>

<style scoped></style>

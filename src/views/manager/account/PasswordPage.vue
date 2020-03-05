<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <PasswordComponent></PasswordComponent>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/manager/common/LayoutComponent';
import PasswordComponent from '@/components/manager/account/PasswordComponent';
export default {
  name: 'PasswordPage',
  components: { PasswordComponent, LayoutComponent },
};
</script>

<style scoped></style>

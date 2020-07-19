<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <PasswordComponent></PasswordComponent>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/admin/common/LayoutComponent';
import PasswordComponent from '@/components/admin/account/PasswordComponent';
export default {
  name: 'PasswordPage',
  components: { PasswordComponent, LayoutComponent },
};
</script>

<style scoped></style>

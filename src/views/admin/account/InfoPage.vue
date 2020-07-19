<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <InfoComponent></InfoComponent>
  </v-app>
</template>

<script>
import InfoComponent from '@/components/admin/account/InfoComponent';
import LayoutComponent from '@/components/admin/common/LayoutComponent';
export default {
  name: 'AccountPage',
  components: { LayoutComponent, InfoComponent },
};
</script>

<style scoped></style>

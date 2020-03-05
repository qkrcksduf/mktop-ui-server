<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <InfoComponent></InfoComponent>
  </v-app>
</template>

<script>
import InfoComponent from '@/components/manager/account/InfoComponent';
import LayoutComponent from '@/components/manager/common/LayoutComponent';
export default {
  name: 'AccountPage',
  components: { LayoutComponent, InfoComponent },
};
</script>

<style scoped></style>

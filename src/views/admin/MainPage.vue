<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <v-content>
      <MainComponent></MainComponent>
    </v-content>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/admin/LayoutComponent';
import MainComponent from '@/components/admin/MainComponent';
export default {
  name: 'MainPage',
  components: { MainComponent, LayoutComponent },
};
</script>

<style scoped></style>

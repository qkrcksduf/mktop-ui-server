<template>
  <v-app id="inspire">
    <layout-component></layout-component>
    <main-component></main-component>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/manager/LayoutComponent';
import MainComponent from '@/components/manager/MainComponent';
export default {
  name: 'MainPage',
  components: { MainComponent, LayoutComponent },
};
</script>

<style scoped></style>

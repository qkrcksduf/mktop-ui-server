<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <MainComponent></MainComponent>
  </v-app>
</template>

<script>
import MainComponent from '@/components/manager/common/MainComponent';
import LayoutComponent from '@/components/manager/common/MainLayoutComponent';
export default {
  name: 'MainPage',
  components: { LayoutComponent, MainComponent },
  methods: {
    parentReceive() {
      console.log('receive');
    },
  },
};
</script>

<style scoped></style>

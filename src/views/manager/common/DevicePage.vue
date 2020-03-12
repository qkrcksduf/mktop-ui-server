<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <DeviceComponent></DeviceComponent>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/manager/common/MainLayoutComponent';
import DeviceComponent from '@/components/manager/common/DeviceComponent';
export default {
  name: 'DevicePage',
  components: { DeviceComponent, LayoutComponent },
};
</script>

<style scoped></style>

<template>
  <v-app id="inspire">
    <layout-component></layout-component>
    <device-update-component></device-update-component>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/manager/LayoutComponent';
import DeviceUpdateComponent from '@/components/manager/DeviceUpdateComponent';
export default {
  name: 'UpdatePage',
  components: { DeviceUpdateComponent, LayoutComponent },
};
</script>

<style scoped></style>

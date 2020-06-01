<template>
  <v-app id="inspire">
    <layout-component></layout-component>
    <device-update-component></device-update-component>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/branch/LayoutComponent';
import DeviceUpdateComponent from '@/components/branch/DeviceUpdateComponent';
export default {
  name: 'UpdatePage',
  components: { DeviceUpdateComponent, LayoutComponent },
};
</script>

<style scoped></style>

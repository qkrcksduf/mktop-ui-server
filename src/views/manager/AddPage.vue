<template>
  <v-app>
    <layout-component></layout-component>
    <device-add-component></device-add-component>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/manager/LayoutComponent';
import DeviceAddComponent from '@/components/manager/DeviceAddComponent';
export default {
  name: 'AddPage',
  components: { DeviceAddComponent, LayoutComponent },
};
</script>

<style scoped></style>

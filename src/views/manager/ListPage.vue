<template>
  <v-app id="inspire">
    <layout-component></layout-component>
    <device-list-component></device-list-component>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/manager/LayoutComponent';
import DeviceListComponent from '@/components/manager/DeviceListComponent';
export default {
  name: 'ListPage',
  components: { DeviceListComponent, LayoutComponent },
};
</script>

<style scoped></style>s

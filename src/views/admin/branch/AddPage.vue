<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <AddComponent></AddComponent>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/admin/common/LayoutComponent';
import AddComponent from '@/components/admin/branch/AddComponent';
export default {
  name: 'AddPage',
  components: { AddComponent, LayoutComponent },
};
</script>

<style scoped></style>

<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <UpdateComponent></UpdateComponent>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/admin/common/LayoutComponent';
import UpdateComponent from '@/components/admin/branch/UpdateComponent';
export default {
  name: 'UpdatePage',
  components: { UpdateComponent, LayoutComponent },
};
</script>

<style scoped></style>

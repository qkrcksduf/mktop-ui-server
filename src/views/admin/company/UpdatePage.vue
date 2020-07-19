<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <CompanyComponent></CompanyComponent>
  </v-app>
</template>

<script>
import CompanyComponent from '@/components/admin/company/UpdateComponent';
import LayoutComponent from '@/components/admin/common/LayoutComponent';
export default {
  name: 'UpdatePage',
  components: { LayoutComponent, CompanyComponent },
};
</script>

<style scoped></style>

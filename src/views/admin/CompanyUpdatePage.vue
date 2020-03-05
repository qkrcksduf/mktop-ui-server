<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <CompanyUpdateForm></CompanyUpdateForm>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/admin/LayoutComponent';
import CompanyUpdateForm from '@/components/admin/CompanyUpdateForm';
export default {
  name: 'CompanyUpdatePage',
  components: {
    CompanyUpdateForm,
    LayoutComponent,
  },
};
</script>

<style scoped></style>

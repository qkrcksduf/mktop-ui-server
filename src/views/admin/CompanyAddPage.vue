<template>
  <v-app class="inspire">
    <LayoutComponent></LayoutComponent>
    <CompanyAddForm></CompanyAddForm>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/admin/LayoutComponent';
import CompanyAddForm from '@/components/admin/CompanyAddForm';
export default {
  name: 'CompanyAddPage',
  components: {
    CompanyAddForm,
    LayoutComponent,
  },
};
</script>

<style scoped></style>

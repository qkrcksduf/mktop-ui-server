<template>
  <v-app class="inspire">
    <LayoutComponent></LayoutComponent>
    <CompanyAddForm></CompanyAddForm>
  </v-app>
</template>

<script>
import LayoutComponent from '@/components/root/LayoutComponent';
import CompanyAddForm from '@/components/root/CompanyAddForm';
export default {
  name: 'CompanyAddPage',
  components: {
    CompanyAddForm,
    LayoutComponent,
  },
};
</script>

<style scoped></style>

<template>
  <v-app id="inspire">
    <LayoutComponent></LayoutComponent>
    <v-content>
      <BranchComponent></BranchComponent>
    </v-content>
  </v-app>
</template>

<script>
import BranchComponent from '@/components/manager/branch/MainComponent';
import LayoutComponent from '@/components/manager/common/LayoutComponent';
export default {
  name: 'BranchPage',
  components: { LayoutComponent, BranchComponent },
};
</script>

<style scoped></style>

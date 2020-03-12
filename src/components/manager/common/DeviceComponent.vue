<template>
  <v-content>
    <v-container>
      <div>
        {{ logMessage }}
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { selectDevicesByBranchId } from '@/api/branch';

export default {
  name: 'DeviceComponent',
  async created() {
    try {
      this.id = this.$route.params.id;
      await this.getDevicesByBranchId();
      this.logMessage = this.id;
    } catch (error) {
      this.logMessage = error.response.data.message;
      console.log(error);
    }
  },

  data() {
    return {
      id: '',
      logMessage: '',
    };
  },

  methods: {
    async getDevicesByBranchId() {
      const { data } = await selectDevicesByBranchId(this.id);
      this.logMessage = this.id;
      console.log(this.logMessage);
      console.log(data);
    },
  },
};
</script>

<style scoped></style>

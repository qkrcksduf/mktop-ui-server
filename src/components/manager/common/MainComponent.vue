<template>
  <v-content style="background-color: #F2F3F4">
    <v-container>
      {{ logMessage }}
      <div>
        <v-simple-table class="font-weight-regular" fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left font-weight-bold">No</th>
                <th class="text-left">지점 이름</th>
                <th class="text-left">장치 이름</th>
                <th class="text-left">온도</th>
                <th class="text-left">측정시간</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr :key="item.no" v-for="item in branchList">
                <td class="font-weight-bold">
                  {{ item.no }}
                </td>
                <td>{{ item.branchName }}</td>
                <td>{{ item.deviceName }}</td>
                <td>{{ item.temperature }}</td>
                <td>{{ item.sensingTime }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { selectDevicesByBranch, selectDevicesByBranchId } from '@/api/branch';
import { eventBus } from '@/utils/eventBus';

export default {
  name: 'MainComponent',
  data() {
    return {
      id: '',
      branchName: '',
      branchList: [],
      logMessage: '',
    };
  },

  async created() {
    eventBus.$on('selectBranch', branch => {
      console.log(branch);
      console.log(branch.id);
      console.log(branch.name);
      this.id = branch.id;
      this.branchName = branch.name;
      if (branch.id === undefined) {
        this.branchList = [];
        this.getDeviceAndBranchList();
        return;
      }
      this.getDevices();
    });
    try {
      await this.getDeviceAndBranchList();
    } catch (error) {
      console.log(error);
      this.logMessage = error.response.data.message;
    }
  },

  computed: {
    getBranchList() {
      return this.branchList;
    },
  },

  methods: {
    async getDevices() {
      this.branchList = [];
      const { data } = await selectDevicesByBranchId(this.id);
      for (let i = 0; i < data.devices.length; i++) {
        let branch = {
          no: i + 1,
          branchName: this.branchName,
          deviceName: data.devices[i].name,
          temperature: data.devices[i].temperatures[0].value,
          sensingTime: data.devices[i].temperatures[0].sensingTime,
        };
        this.branchList.push(branch);
      }
    },

    async getDeviceAndBranchList() {
      const { data } = await selectDevicesByBranch();
      console.log(data);
      console.log(data[0].devices.length);
      let branchName;
      let deviceName;
      let temperature;
      let sensingTime;
      let no;
      for (let i = 0; i < data.length; i++) {
        branchName = data[i].name;
        no = i + 1;
        for (let j = 0; j < data[i].devices.length; j++) {
          deviceName = data[i].devices[j].name;
          temperature = data[i].devices[j].temperatures[0].value;
          sensingTime = data[i].devices[j].temperatures[0].sensingTime;
        }
        let branch = {
          no: no,
          branchName: branchName,
          deviceName: deviceName,
          temperature: temperature,
          sensingTime: sensingTime,
        };
        this.branchList.push(branch);
      }
    },
  },
};
</script>

<style scoped></style>

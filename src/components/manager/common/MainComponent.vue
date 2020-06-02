<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid>
      <v-layout style="margin: 40px" align-center>
        {{ logMessage }}
        <v-card
          class="d-flex flex-wrap mx-auto justify-start"
          style="background-color: #F2F3F4"
          flat
          tile
        >
          <v-card
            width="300"
            class="mx-5 mb-6 justify-start"
            :key="item.no"
            v-for="item in getBranchList"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline"
                  >{{ item.branchName }} -
                  {{ item.deviceName }}</v-list-item-title
                >
                <v-list-item-subtitle>{{
                  item.sensingTime
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3" cols="8">
                  {{ item.temperature }}&deg;
                </v-col>
                <v-col cols="4">
                  <v-img
                    src="../../../assets/blue.png"
                    style="background-color: gray"
                    alt="Sunny image"
                    width="92"
                  ></v-img>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
// import { selectDevicesByBranch, selectDevicesByBranchId } from '@/api/branch';
import { selectDevices } from '@/api/device';
import { eventBus } from '@/utils/eventBus';
import { selectDevicesByBranchId } from '@/api/branch';
import { getCompanyFromCookie } from '@/utils/cookies';

export default {
  name: 'MainComponent',
  data() {
    return {
      id: '',
      branchName: '',
      deviceList: [],
      logMessage: '',
      url: '"../../../assets/blue.png"',
      flag: true,
    };
  },

  // computed: {
  //   getDeviceList() {
  //     return this.deviceList;
  //   },
  // },
  async created() {
    eventBus.$on('test', body => {
      let data = getCompanyFromCookie();
      if (data) {
        console.log('sub');
        console.log(body);
        this.deviceList = [];
        if (this.flag) this.getDeviceAndBranchList();
        else this.getDevices();
        console.log('1');
        return;
      }

      // this.getDeviceAndBranchList();
    });
    eventBus.$on('selectDevice', branch => {
      console.log('2');
      console.log(branch);
      console.log(branch.id);
      console.log(branch.name);
      this.id = branch.id;
      this.branchName = branch.name;
      if (branch.id === undefined) {
        this.flag = true;
        this.deviceList = [];
        this.getDeviceAndBranchList();
        return;
      }
      this.flag = false;
      this.getDevices();
    });
    try {
      console.log('3');
      await this.getDeviceAndBranchList();
    } catch (error) {
      console.log(error);
      this.logMessage = error.response.data.message;
    }
  },

  computed: {
    getBranchList() {
      return this.deviceList;
    },
  },

  methods: {
    async getDevices() {
      let d = new Date();
      let currentTime =
        d.getHours() + '시 ' + d.getMinutes() + '분 ' + d.getSeconds() + '초';
      this.deviceList = [];
      const { data } = await selectDevicesByBranchId(this.id);
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let device = {
          no: i + 1,
          branchName: data[i].branchName,
          deviceName: data[i].name,
          temperature: data[i].temperature,
          sensingTime: currentTime,
        };
        this.deviceList.push(device);
      }
    },

    async getDeviceAndBranchList() {
      let d = new Date();
      let currentTime =
        d.getHours() + '시 ' + d.getMinutes() + '분 ' + d.getSeconds() + '초';
      const { data } = await selectDevices();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let device = {
          no: i + 1,
          branchName: data[i].branchName,
          deviceName: data[i].name,
          temperature: data[i].temperature,
          sensingTime: currentTime,
        };
        this.deviceList.push(device);
      }
    },
  },
};
</script>

<style scoped></style>

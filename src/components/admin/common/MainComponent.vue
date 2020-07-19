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
                    v-if="item.temperature > 200"
                    src="../../../assets/red.png"
                    style="background-color: gray"
                    alt="Sunny image"
                    width="92"
                  ></v-img>
                  <v-img
                    v-else-if="item.temperature < 200 && item.temperature > 100"
                    src="../../../assets/yellow.png"
                    style="background-color: gray"
                    alt="Sunny image"
                    width="92"
                  ></v-img>
                  <v-img
                    v-else
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
import { selectDevices } from '@/api/device';
import { eventBus } from '@/utils/eventBus';
import { selectDevicesByBranchId } from '@/api/branch';
import { initMqttClient } from '@/utils/mqtt.client';
import { getCompanyFromCookie } from '@/utils/cookies';

export default {
  name: 'MainComponent',
  data() {
    return {
      id: '',
      branchName: '',
      deviceList: [],
      logMessage: '',
      flag: true,
    };
  },

  async created() {
    eventBus.$on('update', body => {
      let data = getCompanyFromCookie();
      let d = new Date();
      if (data) {
        for (let i = 0; i < this.deviceList.length; i++) {
          if (body.id === this.deviceList[i].deviceId) {
            this.deviceList[i].temperature = body.temperature;
          }

          this.deviceList[i].sensingTime =
            d.getHours() +
            '시 ' +
            d.getMinutes() +
            '분 ' +
            d.getSeconds() +
            '초';
        }
        return;
      }
      this.getDeviceAndBranchList();
    });

    eventBus.$on('selectDevice', branch => {
      this.id = branch.id;
      this.branchName = branch.name;
      if (branch.id === undefined) {
        this.flag = true; //회사에 속한 모든 디바이스 조회 하는 경우
        this.deviceList = [];
        this.getDeviceAndBranchList();
        return;
      }
      this.flag = false; // 지점에 속한 디바이스 조회하는 경우
      this.getDevices();
    });

    try {
      await this.getDeviceAndBranchList();
      console.log(this.deviceList);
      initMqttClient(this.deviceList);
    } catch (error) {
      this.logMessage = error;
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
      for (let i = 0; i < data.length; i++) {
        let device = {
          no: i + 1,
          branchId: data[i].branchId,
          deviceId: data[i].id,
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

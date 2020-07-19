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
            v-for="item in getDeviceList"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <h3
                  class="d-flex align-center justify-space-between"
                  style="padding-top: 30px"
                >
                  {{ item.deviceName }}

                  <v-btn
                    dark
                    style="padding-right: 20px"
                    title
                    @click="lock(item.deviceId)"
                  >
                    OFF
                  </v-btn>
                </h3>
                <v-list-item-subtitle>{{
                  item.sensingTime
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3" cols="8" test>
                  {{ item.temperature }}&deg;
                </v-col>
                <v-col cols="4">
                  <v-img
                    v-if="item.temperature > 200"
                    src="../../assets/red.png"
                    style="background-color: gray"
                    alt="Sunny image"
                    width="92"
                  ></v-img>
                  <v-img
                    v-else-if="item.temperature < 200 && item.temperature > 100"
                    src="../../assets/yellow.png"
                    style="background-color: gray"
                    alt="Sunny image"
                    width="92"
                  ></v-img>
                  <v-img
                    v-else
                    src="../../assets/blue.png"
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
import { selectDevices, lock } from '@/api/device';
import { eventBus } from '@/utils/eventBus';
import { getBranchFromCookie } from '@/utils/cookies';
import { initMqttClient } from '@/utils/mqtt.client';

export default {
  name: 'MainComponent',
  data() {
    return {
      id: '',
      branchName: '',
      deviceList: [],
      logMessage: '',
    };
  },

  async created() {
    eventBus.$on('update', body => {
      let data = getBranchFromCookie();
      if (data) {
        console.log(body);
        this.getDevices();
      }
    });
    try {
      await this.getDevices();
      initMqttClient(this.deviceList);
    } catch (error) {
      console.log(error);
      this.logMessage = error.response.data.message;
    }
  },

  computed: {
    getDeviceList() {
      return this.deviceList;
    },
  },

  methods: {
    async getDevices() {
      let d = new Date();
      let currentTime =
        d.getHours() + '시 ' + d.getMinutes() + '분 ' + d.getSeconds() + '초';
      const { data } = await selectDevices();
      this.deviceList = [];
      for (let i = 0; i < data.length; i++) {
        let device = {
          no: i + 1,
          deviceId: data[i].id,
          deviceName: data[i].name,
          temperature: data[i].temperature,
          sensingTime: currentTime,
        };
        this.deviceList.push(device);
      }
    },
    async lock(id) {
      await lock(id);
    },
  },
};
</script>

<style scoped></style>

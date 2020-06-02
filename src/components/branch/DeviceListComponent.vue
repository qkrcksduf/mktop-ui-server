<template>
  <v-content>
    <v-container fill-height fluid style="background-color: #F2F3F4">
      <v-layout justify-center style="padding: 40px">
        <v-flex>
          <h2
            class="d-flex align-center justify-space-between"
            style="padding-top: 30px"
          >
            장치 목록

            <v-btn
              color="#26b4ff"
              rounded
              dark
              style="padding-right: 20px"
              title
              to="/branch/device-add"
            >
              <v-icon left>mdi-plus</v-icon>
              신규 장치 등록
            </v-btn>
          </h2>
          <br />
          <div>
            <v-simple-table class="font-weight-regular" fixed-header>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left font-weight-bold">No</th>
                    <th class="text-left font-weight-bold">장치 이름</th>
                    <th class="text-left font-weight-bold">장치 위치</th>
                    <!--                    <th class="text-left font-weight-bold">최대 온도</th>-->
                    <!--                    <th class="text-left font-weight-bold">최소 온도</th>-->
                    <th class="text-left font-weight-bold red--text">
                      위험 온도
                    </th>
                    <th class="text-left font-weight-bold"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="item.id" v-for="item in getCurrentPageList">
                    <td class="font-weight-bold">{{ item.no }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.location }}</td>
                    <!--                    <td>{{ item.maxValue }}</td>-->
                    <!--                    <td>{{ item.minValue }}</td>-->
                    <td>{{ item.cautionValue }}</td>
                    <td>
                      <v-icon
                        @click="updateItem(item.id)"
                        color="indigo lighten-1"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-icon
                        @click="deleteItem(item.id)"
                        color="indigo lighten-1"
                      >
                        mdi-delete
                      </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <br /><br />
          <div class="text-center">
            <v-pagination
              v-model="currentPage"
              :length="maxPage"
              :total-visible="totalVisible"
            ></v-pagination>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { selectDevices, deleteDeviceById } from '@/api/device';

export default {
  name: 'DeviceListComponent',
  computed: {
    getCurrentPageList() {
      const start = (this.currentPage - 1) * this.pagePerItemCount;
      const end = start + this.pagePerItemCount;
      return this.deviceList.slice(start, end);
    },
  },

  methods: {
    async deleteItem(id) {
      try {
        if (confirm('정말로 삭제하시겠습니까?')) {
          await deleteDeviceById(id);
          this.$router.go();
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      }
    },

    updateItem(id) {
      console.log(id);
      this.$router.push(`/branch/device-update/${id}`);
    },

    async getDeviceList() {
      try {
        const { data } = await selectDevices();
        this.length = data.length;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          let device = {
            no: i + 1,
            id: data[i].id,
            name: data[i].name,
            location: data[i].location,
            // maxValue: data[i].maxValue,
            // minValue: data[i].minValue,
            cautionValue: data[i].cautionValue,
          };
          this.deviceList.push(device);
          this.setMaxPage();
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    },

    setMaxPage() {
      if (this.length % this.pagePerItemCount === 0) {
        this.maxPage = this.length / this.pagePerItemCount;
        console.log('maxPage = ' + this.maxPage);
        return;
      }
      this.maxPage = Math.floor(this.length / this.pagePerItemCount) + 1;
      console.log('maxPage = ' + this.maxPage);
    },
  },

  async created() {
    console.log('create');
    await this.getDeviceList();
  },

  data() {
    return {
      currentPage: 1,
      length: 0,
      maxPage: 0,
      pagePerItemCount: 20,
      totalVisible: 7,
      deviceList: [],
    };
  },
};
</script>

<style scoped></style>

<template>
  <v-container fill-height fluid style="background-color: #F2F3F4">
    <v-layout justify-center style="padding: 20px">
      <v-flex>
        <h2
          class="d-flex align-center justify-space-between"
          style="padding-top: 30px"
        >
          지점 목록

          <v-btn
            color="#26b4ff"
            rounded
            dark
            style="padding-right: 20px"
            title
            to="/manager/branch-add"
          >
            <v-icon left>mdi-plus</v-icon>
            신규 지점 등록
          </v-btn>
        </h2>
        <br />
        <div>
          <v-simple-table class="font-weight-regular" fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">No</th>
                  <th class="text-left">지점 이름</th>
                  <th class="text-left">전화 번호</th>
                  <th class="text-left">주소</th>
                  <th class="text-left">담당자</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr :key="item.code" v-for="item in getCurrentPageList">
                  <td class="font-weight-bold">
                    {{ item.no }}
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.phoneNumber }}</td>
                  <td>{{ item.address }}</td>
                  <td>{{ item.manager }}</td>
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
            :length="maxPage"
            circle
            v-model="currentPage"
            :total-visible="totalVisible"
          ></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { selectBranchList, deleteBranchById } from '@/api/branch';

export default {
  name: 'MainComponent',

  async created() {
    try {
      await this.getBranchList();
    } catch (error) {
      console.log(error.message);
    }
  },

  computed: {
    getCurrentPageList() {
      const start = (this.currentPage - 1) * this.pagePerItemCount;
      const end = start + this.pagePerItemCount;
      return this.branchList.slice(start, end);
    },
  },

  methods: {
    async getBranchList() {
      const { data } = await selectBranchList();
      console.log(data);
      this.length = data.length;

      for (let i = 0; i < data.length; i++) {
        let branch = {
          id: data[i].id,
          no: i + 1,
          name: data[i].name,
          phoneNumber: data[i].phoneNumber,
          address: data[i].address,
          manager: data[i].managerName,
        };
        this.setMaxPage();
        this.branchList.push(branch);
      }
    },

    setMaxPage() {
      if (this.length % this.pagePerItemCount === 0) {
        this.maxPage = Math.floor(this.length / this.pagePerItemCount);
        return;
      }
      this.maxPage = Math.floor(this.length / this.pagePerItemCount + 1);
    },

    async deleteItem(id) {
      try {
        if (confirm('정말로 삭제하시겠습니까?')) {
          await deleteBranchById(id);
          this.$router.go();
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },

    updateItem(id) {
      this.$router.push(`/manager/branch-update/${id}`);
    },
  },

  data() {
    return {
      branchList: [],
      currentPage: 1,
      length: 0,
      maxPage: 0,
      pagePerItemCount: 20,
      totalVisible: 7,
    };
  },
};
</script>

<style scoped></style>

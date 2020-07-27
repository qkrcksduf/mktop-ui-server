<template>
  <v-container fill-height fluid style="background-color: #F2F3F4">
    <v-layout justify-center style="padding: 40px">
      <v-flex>
        <h2
          class="d-flex align-center justify-space-between"
          style="padding-top: 30px"
        >
          회사 목록

          <v-btn
            color="#26b4ff"
            rounded
            dark
            style="padding-right: 20px"
            title
            to="/root/company-add"
          >
            <v-icon left>mdi-plus</v-icon>
            신규 회사 등록
          </v-btn>
        </h2>
        <br />
        <div>
          <v-simple-table class="font-weight-regular" fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">No</th>
                  <th class="text-left font-weight-bold">회사 이름</th>
                  <th class="text-left font-weight-bold">전화번호</th>
                  <th class="text-left font-weight-bold">주소</th>
                  <th class="text-left font-weight-bold">관리자</th>
                  <th class="text-left font-weight-bold"></th>
                </tr>
              </thead>
              <tbody>
                <tr :key="i" v-for="(item, i) in getCurrentPageList">
                  <td class="font-weight-bold">{{ item.no }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.phoneNumber }}</td>
                  <td>{{ item.address }}</td>
                  <td>{{ item.admin }}</td>
                  <td>
                    <v-icon
                      :disabled="!item.canUpdateInfoByRoot"
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
</template>

<script>
import { selectCompanyList, deleteCompanyById } from '@/api/company';
export default {
  name: 'MainComponent',

  data() {
    return {
      canUpdateInfoByRoot: true,
      currentPage: 1,
      length: 0,
      maxPage: 0,
      pagePerItemCount: 20,
      totalVisible: 7,
      companyList: [],
    };
  },

  computed: {
    getCurrentPageList() {
      const start = (this.currentPage - 1) * this.pagePerItemCount;
      const end = start + this.pagePerItemCount;
      return this.companyList.slice(start, end);
    },
  },

  methods: {
    async deleteItem(id) {
      try {
        if (confirm('정말로 삭제하시겠습니까?')) {
          await deleteCompanyById(id);
          this.$router.go(0);
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      }
    },

    updateItem(id) {
      this.$router.push(`/root/company-update/${id}`);
    },
    async getCompanyList() {
      try {
        const { data } = await selectCompanyList();
        console.log(data);
        this.length = data.length;
        for (let i = 0; i < data.length; i++) {
          let company = {
            no: i + 1,
            id: data[i].id,
            name: data[i].name,
            phoneNumber: data[i].phoneNumber,
            address: data[i].address,
            admin: data[i].adminName,
            canUpdateInfoByRoot: data[i].canUpdateInfoByRoot,
          };
          this.companyList.push(company);
          this.setMaxPage();
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    setMaxPage() {
      if (this.length % this.pagePerItemCount === 0) {
        this.maxPage = this.length / this.pagePerItemCount;
        return;
      }
      this.maxPage = Math.floor(this.length / this.pagePerItemCount) + 1;
    },
  },

  async created() {
    console.log('create');
    await this.getCompanyList();
  },
};
</script>

<style scoped></style>

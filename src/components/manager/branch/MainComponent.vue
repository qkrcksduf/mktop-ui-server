<template>
  <v-container fill-height fluid style="background-color: #F2F3F4">
    <v-layout align-center justify-center>
      <v-flex>
        <h2
          class="d-flex align-center justify-space-between"
          style="padding-left: 10px"
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
                <tr :key="item.code" v-for="item in branch">
                  <td class="font-weight-bold">{{ item.no }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.phoneNumber }}</td>
                  <td>{{ item.address }}</td>
                  <td>{{ item.admin }}</td>
                  <td>
                    <v-icon @click="updateItem" color="indigo lighten-1">
                      mdi-pencil
                    </v-icon>
                    <v-icon @click="deleteItem" color="indigo lighten-1">
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
          <v-pagination :length="5" circle v-model="branch.no"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MainComponent',
  methods: {
    deleteItem() {
      confirm('정말로 삭제하시겠습니까?');
    },
    updateItem() {
      this.$router.push('/manager/branch-update');
    },
  },
  data() {
    return {
      branch: [
        {
          no: 1,
          code: 'C001',
          name: '지점1',
          phoneNumber: '042-000-0001',
          address: '유성구 덕명동',
          admin: '홍길동',
        },
        {
          no: 2,
          code: 'C002',
          name: '지점2',
          phoneNumber: '042-000-0002',
          address: '동구 용전동',
          admin: '담당자',
        },
        {
          no: 3,
          code: 'C003',
          name: '지점3',
          phoneNumber: '042-000-0003',
          address: '동구 자양동',
          admin: '담당자',
        },
        {
          no: 4,
          code: 'C004',
          name: '지점4',
          phoneNumber: '042-000-0004',
          address: '동구 가양동',
          admin: '담당자',
        },
        {
          no: 5,
          code: 'C005',
          name: '지점5',
          phoneNumber: '042-000-0005',
          address: '중구 은행동',
          admin: '담당자',
        },
        {
          no: 6,
          code: 'C006',
          name: '지점6',
          phoneNumber: '042-000-0006',
          address: '중구 대흥동',
          admin: '담당자',
        },
        {
          no: 7,
          code: 'C007',
          name: '지점7',
          phoneNumber: '042-000-0007',
          address: '중구 목동',
          admin: '담당자',
        },
        {
          no: 8,
          code: 'C008',
          name: '지점8',
          phoneNumber: '042-000-0008',
          address: '서구 둔산동',
          admin: '담당자',
        },
        {
          no: 9,
          code: 'C009',
          name: '지점9',
          phoneNumber: '042-000-0009',
          address: '서구 월평동',
          admin: '담당자',
        },
        {
          no: 10,
          code: 'C010',
          name: '지점10',
          phoneNumber: '042-000-0010',
          address: '서구 갈마동',
          admin: '담당자',
        },
        {
          no: 11,
          code: 'C011',
          name: '지점11',
          phoneNumber: '042-000-0011',
          address: '유성구 노은동',
          admin: '담당자',
        },
        {
          no: 12,
          code: 'C012',
          name: '지점12',
          phoneNumber: '042-000-0012',
          address: '유성구 덕명동',
          admin: '담당자',
        },
        {
          no: 13,
          code: 'C013',
          name: '지점13',
          phoneNumber: '042-000-0013',
          address: '유성구 봉명동',
          admin: '담당자',
        },
        {
          no: 14,
          code: 'C014',
          name: '지점14',
          phoneNumber: '042-000-0014',
          address: '유성구 관평동',
          admin: '담당자',
        },
        {
          no: 15,
          code: 'C015',
          name: '지점15',
          phoneNumber: '042-000-0015',
          address: '유성구 덕명',
          admin: '담당자',
        },
        {
          no: 16,
          code: 'C016',
          name: '지점16',
          phoneNumber: '042-000-0016',
          address: '서구 둔산동',
          admin: '담당자',
        },
        {
          no: 17,
          code: 'C017',
          name: '지점17',
          phoneNumber: '042-000-0017',
          address: '동구 용전',
          admin: '담당자',
        },
        {
          no: 18,
          code: 'C018',
          name: '지점18',
          phoneNumber: '042-000-0018',
          address: '동구 가양',
          admin: '담당자',
        },
        {
          no: 19,
          code: 'C019',
          name: '지점19',
          phoneNumber: '042-000-0019',
          address: '중구 은행동',
          admin: '담당자',
        },
        {
          no: 20,
          code: 'C020',
          name: '지점20',
          phoneNumber: '042-000-0020',
          address: '유성구 봉명동',
          admin: '담당자',
        },
      ],
    };
  },
};
</script>

<style scoped></style>

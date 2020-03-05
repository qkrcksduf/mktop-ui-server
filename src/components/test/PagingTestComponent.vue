<template>
  <div>
    <h1>TABLE PAGINATION</h1>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left font-weight-bold">No</th>
          <th class="text-left font-weight-bold">TEL</th>
          <th class="text-left font-weight-bold">ADDRESS</th>
          <th class="text-left font-weight-bold">NAME</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.no" v-for="item in paginatedData">
          <td class="font-weight-bold">{{ item.no }}</td>
          <td>{{ item.tel }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
      <div>
        <v-btn :disabled="pageNum === 0" @click="prevPage">다음</v-btn>
        <span>{{ pageNum + 1 }}</span>
        <v-btn :disabled="pageNum >= pageCount - 1" @click="nextPage"
          >다음</v-btn
        >
      </div>
    </v-simple-table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PagingTestComponent',
  data() {
    return {
      pageNum: 0,
      pageArray: [],
      pageSize: {
        type: Number,
        required: false,
        default: 10,
      },
    };
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    pageCount() {
      let listLeng = this.pageArray.length,
        listSize = this.pageSize,
        page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    },

    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
      return this.pageArray.slice(start, end);
    },
  },

  created() {
    axios
      .get('http://sample.bmaster.kro.kr/contacts')
      .then(response => {
        console.log(response);
        this.pageArray = response.data.contacts;
      })
      .catch(err => {
        console.log(err);
      });
  },
};
</script>

<style scoped></style>

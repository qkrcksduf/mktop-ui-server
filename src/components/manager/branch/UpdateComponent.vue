<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg4>
          <v-card class="elevation-12">
            <v-card-title style="color: white" class="grey darken-2">
              지점 정보 수정
            </v-card-title>
            <v-container grid-list-sm>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    value="홍길동"
                    prepend-icon="mdi-account"
                    placeholder="이름"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    value="지점1"
                    prepend-icon="mdi-domain"
                    placeholder="지점 이름"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-phone"
                    value="010-1234-5678"
                    placeholder="010-0000-0000"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-note"
                    value="유성구 덕명동"
                    placeholder="주소"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">Cancel</v-btn>
              <v-btn text color="primary" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'CompanyUpdateForm',
  methods: {
    cancel() {
      this.$router.push('/manager/branch');
    },
    save() {
      console.log('save');
    },
    click() {
      console.log('click');
    },
  },
};
</script>

<style scoped></style>

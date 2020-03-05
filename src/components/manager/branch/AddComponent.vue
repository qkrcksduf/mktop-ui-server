<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg4>
          <v-card class="elevation-12">
            <v-card-title style="color: white" class="grey darken-2">
              지점 추가
            </v-card-title>
            <v-container grid-list-sm>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-layout align-center>
                    <v-text-field
                      prepend-icon="mdi-account"
                      placeholder="이름"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-domain"
                    placeholder="지점 이름"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    type="tel"
                    prepend-icon="mdi-phone"
                    placeholder="010 - 0000 - 0000"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-note"
                    placeholder="주소"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">Cancel</v-btn>
              <v-btn text color="primary" @click="save">Create</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'CompanyAddForm',
  methods: {
    cancel() {
      console.log('calcel');
      this.$router.push('/manager/branch');
    },
    save() {
      console.log('save');
    },
  },
};
</script>

<style scoped></style>

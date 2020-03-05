<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg4>
          <v-card class="elevation-12">
            <v-card-title style="color: white" class="grey darken-2">
              회사 정보 변경
            </v-card-title>
            <v-container grid-list-sm>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-domain"
                    v-model="name"
                    placeholder="company"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-phone"
                    v-model="phoneNumber"
                    placeholder="010-0000-0000"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-note"
                    v-model="address"
                    placeholder="address"
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
import { selectCompany } from '@/api/company';
import { getCompanyFromCookie } from '@/utils/cookies';

export default {
  name: 'CompanyComponent',
  data() {
    return {
      companyId: '',
      name: '',
      phoneNumber: '',
      address: '',
    };
  },

  async created() {
    console.log('created');
    this.companyId = getCompanyFromCookie();
    console.log(this.companyId);
    const { data } = await selectCompany(this.companyId);
    console.log(data);
  },

  methods: {
    cancel() {
      this.$router.push('/manager/main');
    },
    save() {
      console.log('update');
    },
  },
};
</script>

<style scoped></style>

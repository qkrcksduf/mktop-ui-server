<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg4>
          <v-card class="elevation-12">
            <v-card-title style="color: white" class="grey darken-2">
              회사 추가
            </v-card-title>
            <v-container grid-list-sm>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-layout align-center>
                    <v-text-field
                      v-model="name"
                      prepend-icon="mdi-account"
                      placeholder="이름"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="companyName"
                    prepend-icon="mdi-domain"
                    placeholder="회사 이름"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="username"
                    prepend-icon="mdi-email"
                    placeholder="아이디(이메일 형식)"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="password"
                    prepend-icon="mdi-lock"
                    placeholder="비밀번호"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="phoneNumber"
                    type="tel"
                    prepend-icon="mdi-phone"
                    placeholder="010 - 0000 - 0000"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="address"
                    prepend-icon="mdi-note"
                    placeholder="주소"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">Cancel</v-btn>
              <v-btn text color="primary" @click="insert">Create</v-btn>
            </v-card-actions>
            <p class="log">{{ logMessage }}</p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { insertCompany, insertAccount } from '@/api/company';
export default {
  name: 'CompanyAddForm',
  data() {
    return {
      id: '',
      logMessage: '',
      name: '',
      companyName: '',
      username: '',
      password: '',
      phoneNumber: '',
      address: '',
    };
  },
  methods: {
    cancel() {
      console.log('calcel');
      this.$router.push('/admin/main');
    },

    createText() {
      let text = '';
      let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },

    async insert() {
      try {
        let text = this.createText();

        const { data } = await insertAccount({
          authority: 'company',
          phoneNumber: '010-1234-1234',
          email: `${text}@text.com`,
          name: this.name,
          username: this.username,
          password: this.password,
        });

        await insertCompany({
          accountId: data.id,
          name: this.companyName,
          phoneNumber: this.phoneNumber,
          address: this.address,
        });
        this.$router.push('/admin/main');
      } catch (error) {
        this.logMessage = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped></style>

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
                  <v-text-field
                    v-model="companyName"
                    prepend-icon="mdi-domain"
                    placeholder="회사 이름"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    prepend-icon="mdi-email"
                    placeholder="아이디"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    type="password"
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
                  <p class="validation-text">
                    <span class="warn" v-if="!phoneNumberValid && phoneNumber">
                      전화번호를 입력해 주세요.
                    </span>
                  </p>
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
              <v-btn text @click="cancel">취소하기</v-btn>
              <v-btn
                :disabled="
                  !phoneNumberValid ||
                    !username ||
                    !phoneNumber ||
                    !address ||
                    !companyName ||
                    !password
                "
                text
                color="primary"
                @click="insert"
                >생성하기</v-btn
              >
            </v-card-actions>
            <p class="log">{{ logMessage }}</p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { insertCompany } from '@/api/company';
import { insertAccount } from '@/api/accunt';
import { validatePhoneNumber } from '@/utils/validation';

export default {
  name: 'CompanyAddForm',
  data() {
    return {
      adminId: '',
      companyName: '',
      username: '',
      password: '',
      phoneNumber: '',
      address: '',
      logMessage: '',
    };
  },

  computed: {
    phoneNumberValid() {
      return validatePhoneNumber(this.phoneNumber);
    },
  },

  methods: {
    cancel() {
      this.$router.push('/root/main');
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
        await this.insertAccount();
        await this.insertCompany();
        this.$router.push('/root/main');
      } catch (error) {
        this.logMessage = error.response.data.message;
      }
    },

    async insertAccount() {
      const { data } = await insertAccount({
        role: 'admin',
        phoneNumber: '010-1234-1234',
        email: `${this.createText()}@text.com`,
        name: '홍길동',
        username: this.username,
        password: this.password,
      });
      this.adminId = data.id;
    },

    async insertCompany() {
      await insertCompany({
        adminId: this.adminId,
        name: this.companyName,
        phoneNumber: this.phoneNumber,
        address: this.address,
      });
    },
  },
};
</script>

<style scoped></style>

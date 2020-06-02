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
                  <v-text-field
                    prepend-icon="mdi-domain"
                    v-model="branchName"
                    placeholder="지점 이름"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    prepend-icon="mdi-email"
                    placeholder="아이디(이메일 형식)"
                  ></v-text-field>
                  <p class="validation-text">
                    <span class="warn" v-if="!userNameValid && username">
                      이메일 형식이 아닙니다.
                    </span>
                  </p>
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
                    type="tel"
                    prepend-icon="mdi-phone"
                    v-model="phoneNumber"
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
                    prepend-icon="mdi-note"
                    v-model="address"
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
                  !phoneNumber ||
                    !username ||
                    !password ||
                    !branchName ||
                    !address ||
                    !phoneNumberValid
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
import { validatePhoneNumber } from '@/utils/validation';
import { insertAccount } from '@/api/accunt';
import { insertBranch } from '@/api/branch';
import { validateEmail } from '@/utils/validation';
import { getCompanyFromCookie } from '@/utils/cookies';

export default {
  name: 'CompanyAddForm',

  data() {
    return {
      logMessage: '',
      id: '',
      branchName: '',
      username: '',
      password: '',
      phoneNumber: '',
      address: '',
    };
  },

  computed: {
    phoneNumberValid() {
      return validatePhoneNumber(this.phoneNumber);
    },

    userNameValid() {
      return validateEmail(this.username);
    },
  },

  methods: {
    cancel() {
      console.log('cancel');
      this.$router.push('/manager/branch');
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
        await this.insertBranch();
        this.$router.push('/manager/branch');
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
    },

    async insertAccount() {
      const { data } = await insertAccount({
        role: 'manager',
        phoneNumber: '010-1234-1234',
        email: `${this.createText()}@text.com`,
        name: '홍길동',
        username: this.username,
        password: this.password,
      });
      console.log(data);
      console.log(data.id);
      this.id = data.id;
      console.log(this.id);
    },

    async insertBranch() {
      let companyId = getCompanyFromCookie();
      const { data } = await insertBranch({
        managerId: this.id,
        companyId: companyId,
        name: this.branchName,
        phoneNumber: this.phoneNumber,
        address: this.address,
      });
      console.log(data);
    },
  },
};
</script>

<style scoped></style>

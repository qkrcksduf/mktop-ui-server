<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg4>
          <v-card class="elevation-12">
            <v-card-title style="color: white" class="grey darken-2">
              계정 정보 변경
            </v-card-title>
            <v-container grid-list-sm>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-message"
                    v-model="name"
                    placeholder="이름"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-account"
                    v-model="username"
                    placeholder="아이디"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-email"
                    v-model="email"
                    placeholder="이메일"
                  ></v-text-field>
                  <p class="validation-text">
                    <span class="warn" v-if="!emailValid && email">
                      이메일 형식이 아닙니다.
                    </span>
                  </p>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-phone"
                    v-model="phoneNumber"
                    placeholder="010-0000-0000"
                  ></v-text-field>
                  <p class="validation-text">
                    <span class="warn" v-if="!phoneNumberValid && phoneNumber">
                      전화번호를 입력해 주세요.
                    </span>
                  </p>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">취소하기</v-btn>
              <v-btn
                :disabled="
                  !emailValid ||
                    !phoneNumberValid ||
                    !email ||
                    !username ||
                    !phoneNumber ||
                    !name
                "
                text
                color="primary"
                @click="updateInfo"
                >변경하기</v-btn
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
import { getUserIdFromCookie, saveUserToCookie } from '@/utils/cookies';
import { selectAccountById, updateInfoById } from '@/api/accunt';
import { validatePhoneNumber, validateEmail } from '@/utils/validation';
import { deleteCookie } from '../../../utils/cookies';

export default {
  name: 'AccountComponent',
  data() {
    return {
      id: '',
      name: '',
      username: '',
      email: '',
      phoneNumber: '',
      logMessage: '',
    };
  },

  async created() {
    try {
      this.id = getUserIdFromCookie();
      const { data } = await selectAccountById(this.id);
      console.log(data);
      this.name = data.name;
      this.username = data.username;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    emailValid() {
      return validateEmail(this.email);
    },

    usernameValid() {
      return validateEmail(this.username);
    },

    phoneNumberValid() {
      return validatePhoneNumber(this.phoneNumber);
    },
  },

  methods: {
    cancel() {
      this.$router.push('/admin/main');
    },

    async updateInfo() {
      try {
        const { data } = await updateInfoById({
          id: this.id,
          name: this.name,
          username: this.username,
          email: this.email,
          phoneNumber: this.phoneNumber,
        });
        console.log(data);
        deleteCookie('user');
        saveUserToCookie(this.name);
        this.$store.commit('setName', this.name);
        this.$router.push('/admin/main');
      } catch (error) {
        this.logMessage = error.response.data.message;
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>

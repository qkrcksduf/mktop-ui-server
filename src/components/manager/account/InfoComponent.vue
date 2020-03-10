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
                    prepend-icon="mdi-account"
                    v-model="name"
                    placeholder="이름"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-key"
                    v-model="username"
                    placeholder="아이디(이메일 형식)"
                  ></v-text-field>
                  <p class="validation-text">
                    <span class="warn" v-if="!usernameValid && username">
                      Please enter an email address
                    </span>
                  </p>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-email"
                    v-model="email"
                    placeholder="email"
                  ></v-text-field>
                  <p class="validation-text">
                    <span class="warn" v-if="!emailValid && email">
                      Please enter an email address
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
                      Please enter an phoneNumber
                    </span>
                  </p>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">Cancel</v-btn>
              <v-btn
                :disabled="
                  !usernameValid ||
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
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import { getUserIdFromCookie } from '@/utils/cookies';
import { selectAccountById, updateInfoById } from '@/api/accunt';
import { validatePhoneNumber, validateEmail } from '@/utils/validation';

export default {
  name: 'AccountComponent',
  data() {
    return {
      id: '',
      name: '',
      username: '',
      email: '',
      phoneNumber: '',
    };
  },

  async created() {
    try {
      this.id = getUserIdFromCookie();
      const { data } = await selectAccountById(this.id);
      this.name = data.account.name;
      this.username = data.account.username;
      this.email = data.account.email;
      this.phoneNumber = data.account.phoneNumber;
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
      this.$router.push('/manager/main');
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
        this.$router.push('/manager/main');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>

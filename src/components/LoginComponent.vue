<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12" width="500">
            <v-toolbar color="deep-purple accent-4" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-form @submit.prevent="submitForm">
              <v-card-text>
                <v-text-field
                  id="email"
                  v-model="email"
                  label="Email"
                  name="email"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>
                <p class="validation-text">
                  <span class="warn" v-if="!emailValid && email">
                    이메일 형식이 아닙니다.
                  </span>
                </p>
                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                >
                </v-text-field>
              </v-card-text>
              <p class="log">{{ logMessage }}</p>
              <v-card-actions>
                <v-spacer> </v-spacer>
                <v-btn
                  :disabled="!emailValid || !password"
                  color="deep-purple accent-4"
                  white
                  type="submit"
                  style="color: white"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { loginUser } from '@/api/auth';
import { validateEmail } from '@/utils/validation';
import {
  saveAuthCookie,
  saveUserToCookie,
  saveCompanyToCookie,
  saveUserIdToCookie,
  saveBranchToCookie,
} from '@/utils/cookies';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      logMessage: '',
      show: true,
    };
  },
  computed: {
    emailValid() {
      return validateEmail(this.email);
    },
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          username: this.email,
          password: this.password,
        };
        const { data } = await loginUser(userData);
        console.log(data);
        this.$store.commit('setName', data.account.name);
        this.$store.commit('setToken', data.token);
        saveUserToCookie(data.account.name);
        saveAuthCookie(data.token);
        if (data.account.role === 'root') {
          this.$router.push('/admin/main');
        } else if (data.account.role === 'admin') {
          console.log(data.companyId);
          saveCompanyToCookie(data.companyId);
          saveUserIdToCookie(data.account.id);
          this.$router.push('/manager/main');
        } else if (data.account.role === 'manager') {
          saveBranchToCookie(data.branchId);
          this.$router.push('/branch/main');
        }
      } catch (error) {
        this.logMessage = error.response.data.message;
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style scoped></style>

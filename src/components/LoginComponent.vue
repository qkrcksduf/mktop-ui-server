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
                    Please enter an email address
                  </span>
                </p>
                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
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
} from '@/utils/cookies';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      logMessage: '',
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
        console.log(data.name);
        this.$store.commit('setName', data.name);
        this.$store.commit('setToken', data.token);
        saveUserToCookie(data.name);
        saveAuthCookie(data.token);
        if (data.authority === 'mktop_admin') {
          this.$router.push('/admin/main');
        } else if (data.authority === 'company_admin') {
          saveCompanyToCookie(data.companyId);
          console.log('accountId:' + data.id);
          saveUserIdToCookie(data.id);
          this.$router.push('/manager/main');
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

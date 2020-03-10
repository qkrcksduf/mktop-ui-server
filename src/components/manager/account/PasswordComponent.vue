<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg4>
          <v-card class="elevation-12">
            <v-card-title style="color: white" class="grey darken-2">
              비밀번호 변경
            </v-card-title>
            <v-container grid-list-sm>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-account-key"
                    type="password"
                    v-model="currentPassword"
                    placeholder="현재 비밀번호"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-account"
                    type="password"
                    v-model="changePassword"
                    placeholder="새 비밀번호"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-account"
                    type="password"
                    v-model="checkChangePassword"
                    placeholder="새 비밀번호 확인"
                  ></v-text-field>
                </v-flex>
                <span
                  class="warn"
                  v-if="
                    checkChangePassword &&
                      changePassword !== checkChangePassword
                  "
                >
                  Please enter an email address
                </span>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">Cancel</v-btn>
              <v-btn
                :disabled="
                  !currentPassword ||
                    !changePassword ||
                    !checkChangePassword ||
                    changePassword !== checkChangePassword
                "
                text
                color="primary"
                @click="updatePassword"
                >Save</v-btn
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
import { updatePassword } from '@/api/accunt';

export default {
  name: 'PasswordComponent',
  data() {
    return {
      logMessage: '',
      currentPassword: '',
      changePassword: '',
      checkChangePassword: '',
    };
  },

  methods: {
    async updatePassword() {
      try {
        console.log('updatePassword');
        await updatePassword({
          currentPassword: this.currentPassword,
          changePassword: this.changePassword,
          checkChangePassword: this.checkChangePassword,
        });
        this.$router.push('/manager/main');
      } catch (error) {
        console.log(error);
        this.logMessage = error;
      }
    },

    cancel() {
      this.$router.push('/manager/main');
    },
  },
};
</script>

<style scoped></style>

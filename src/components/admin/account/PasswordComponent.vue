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
                    :type="show1 ? 'text' : 'password'"
                    v-model="currentPassword"
                    placeholder="현재 비밀번호"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-account"
                    :type="show2 ? 'text' : 'password'"
                    v-model="changePassword"
                    placeholder="새 비밀번호"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="mdi-account"
                    :type="show3 ? 'text' : 'password'"
                    v-model="checkChangePassword"
                    placeholder="새 비밀번호 확인"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show3 = !show3"
                  ></v-text-field>
                </v-flex>
                <span
                  class="warn"
                  v-if="
                    checkChangePassword &&
                      changePassword !== checkChangePassword
                  "
                >
                  비밀번호를 다시 확인해 주세요.
                </span>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">취소하기</v-btn>
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
import { updatePassword } from '@/api/accunt';
import { getUserIdFromCookie } from '@/utils/cookies';

export default {
  name: 'PasswordComponent',
  data() {
    return {
      show1: true,
      show2: true,
      show3: true,
      id: '',
      logMessage: '',
      currentPassword: '',
      changePassword: '',
      checkChangePassword: '',
    };
  },

  methods: {
    async updatePassword() {
      try {
        this.id = getUserIdFromCookie();
        console.log('updatePassword');
        await updatePassword({
          id: this.id,
          oldPassword: this.currentPassword,
          newPassword: this.checkChangePassword,
        });
        this.$router.push('/admin/main');
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
    },

    cancel() {
      this.$router.push('/admin/main');
    },
  },
};
</script>

<style scoped></style>

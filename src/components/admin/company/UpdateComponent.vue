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
                    placeholder="address"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-checkbox
                    v-model="canUpdateInfoByRoot"
                    style="color: red"
                    label="고객사 정보 변경에 대한 권한 부여"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">취소하기</v-btn>
              <v-btn
                :disabled="
                  !phoneNumber || !address || !name || !phoneNumberValid
                "
                text
                color="primary"
                @click="update"
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
import { selectCompanyById, updateCompanyById } from '@/api/company';
import { getCompanyFromCookie } from '@/utils/cookies';
import { validatePhoneNumber } from '@/utils/validation';

export default {
  name: 'CompanyComponent',
  data() {
    return {
      canUpdateInfoByRoot: true,
      logMessage: '',
      companyId: '',
      name: '',
      phoneNumber: '',
      address: '',
    };
  },

  async created() {
    try {
      this.id = getCompanyFromCookie();
      const { data } = await selectCompanyById(this.id);
      console.log(data);
      this.name = data.name;
      this.phoneNumber = data.phoneNumber;
      this.address = data.address;
      this.canUpdateInfoByRoot = data.canUpdateInfoByRoot;
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    phoneNumberValid() {
      return validatePhoneNumber(this.phoneNumber);
    },
  },

  methods: {
    cancel() {
      this.$router.push('/admin/main');
    },

    async update() {
      try {
        await updateCompanyById({
          id: this.id,
          name: this.name,
          phoneNumber: this.phoneNumber,
          address: this.address,
          canUpdateInfoByRoot: this.canUpdateInfoByRoot,
        });
        this.$router.push('/admin/main');
      } catch (error) {
        this.logMessage = error;
      }
    },
  },
};
</script>

<style scoped></style>

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
                      Please enter an phoneNumber
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
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">Cancel</v-btn>
              <v-btn
                :disabled="
                  !phoneNumber || !address || !name || !phoneNumberValid
                "
                text
                color="primary"
                @click="update"
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
import { selectCompanyById, updateCompanyById } from '@/api/company';
import { getCompanyFromCookie } from '@/utils/cookies';
import { validatePhoneNumber } from '@/utils/validation';

export default {
  name: 'CompanyComponent',
  data() {
    return {
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
      this.name = data.name;
      this.phoneNumber = data.phoneNumber;
      this.address = data.address;
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
      this.$router.push('/manager/main');
    },

    async update() {
      try {
        await updateCompanyById({
          id: this.id,
          name: this.name,
          phoneNumber: this.phoneNumber,
          address: this.address,
        });
        this.$router.push('/manager/main');
      } catch (error) {
        this.logMessage = error;
      }
    },
  },
};
</script>

<style scoped></style>

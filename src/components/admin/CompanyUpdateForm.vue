<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg4>
          <v-card class="elevation-12">
            <v-card-title style="color: white" class="grey darken-2">
              회사 정보 수정
            </v-card-title>
            <v-container grid-list-sm>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="companyName"
                    prepend-icon="mdi-domain"
                    placeholder="company"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="phoneNumber"
                    prepend-icon="mdi-phone"
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
                    v-model="address"
                    prepend-icon="mdi-note"
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
                  !companyName || !phoneNumber || !address || !phoneNumberValid
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
import { updateCompanyById, selectCompanyById } from '@/api/company';
import { validatePhoneNumber } from '@/utils/validation';

export default {
  name: 'CompanyUpdateForm',
  async created() {
    try {
      this.id = this.$route.params.id;
      const { data } = await selectCompanyById(this.id);
      this.phoneNumber = data.phoneNumber;
      this.address = data.address;
      this.companyName = data.name;
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      id: '',
      companyName: '',
      address: '',
      phoneNumber: '',
      logMessage: '',
    };
  },

  computed: {
    phoneNumberValid() {
      return validatePhoneNumber(this.phoneNumber);
    },
  },

  methods: {
    async update() {
      try {
        await updateCompanyById({
          id: this.id,
          name: this.companyName,
          address: this.address,
          phoneNumber: this.phoneNumber,
        });
        this.$router.push('/admin/main');
      } catch (error) {
        console.log(error);
        this.logMessage = error;
      }
    },

    cancel() {
      this.$router.push('/admin/main');
    },

    click() {
      console.log('click');
    },
  },
};
</script>

<style scoped></style>

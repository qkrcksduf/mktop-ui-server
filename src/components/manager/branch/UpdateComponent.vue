<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg4>
          <v-card class="elevation-12">
            <v-card-title style="color: white" class="grey darken-2">
              지점 정보 수정
            </v-card-title>
            <v-container grid-list-sm>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="branchName"
                    prepend-icon="mdi-domain"
                    placeholder="지점 이름"
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
                    placeholder="주소"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">Cancel</v-btn>
              <v-btn
                text
                :disabled="
                  !phoneNumber || !address || !branchName || !phoneNumberValid
                "
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
import { selectBranchById, updateBranchById } from '@/api/branch';
import { validatePhoneNumber } from '@/utils/validation';

export default {
  name: 'CompanyUpdateForm',
  async created() {
    try {
      this.id = this.$route.params.id;
      await this.getBranch();
    } catch (error) {
      this.logMessage = error.response.data.message;
    }
  },

  data() {
    return {
      id: '',
      address: '',
      phoneNumber: '',
      branchName: '',
      logMessage: '',
    };
  },

  computed: {
    phoneNumberValid() {
      return validatePhoneNumber(this.phoneNumber);
    },
  },

  methods: {
    async getBranch() {
      const { data } = await selectBranchById(this.id);
      console.log(data);
      this.address = data.address;
      this.phoneNumber = data.phoneNumber;
      this.branchName = data.name;
    },

    async update() {
      try {
        await updateBranchById({
          id: this.id,
          name: this.branchName,
          phoneNumber: this.phoneNumber,
          address: this.address,
        });
        this.$router.push('/manager/branch');
      } catch (error) {
        this.logMessage = error.response.data.message;
      }
    },

    cancel() {
      this.$router.push('/manager/branch');
    },

    click() {
      console.log('click');
    },
  },
};
</script>

<style scoped></style>

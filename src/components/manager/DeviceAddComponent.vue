<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg4>
          <v-card class="elevation-12">
            <v-card-title style="color: white" class="grey darken-2">
              장치 추가
            </v-card-title>
            <v-container grid-list-sm>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="deviceName"
                    prepend-icon="mdi-cube"
                    placeholder="장치 이름"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="serial"
                    prepend-icon="mdi-numeric"
                    placeholder="시리얼 번호"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="location"
                    prepend-icon="mdi-forward"
                    placeholder="위치"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="cautionValue"
                    prepend-icon="mdi-alert-circle"
                    placeholder="위험온도"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="insert"
                :disabled="
                  !cautionValueValid ||
                    !minValueValid ||
                    !deviceName ||
                    !serial ||
                    !location ||
                    !cautionValue
                "
                >Create</v-btn
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
import { insertDevice } from '@/api/device';
import { getBranchFromCookie } from '@/utils/cookies';

export default {
  name: 'CompanyAddForm',
  created() {
    this.id = getBranchFromCookie();
    console.log(this.id);
  },

  data() {
    return {
      id: '',
      deviceName: '',
      serial: '',
      location: '',
      minValue: '',
      maxValue: '',
      cautionValue: '',
      logMessage: '',
    };
  },

  computed: {
    minValueValid() {
      return Number(this.minValue) <= Number(this.maxValue);
    },
    cautionValueValid() {
      return Number(this.cautionValue >= Number(this.maxValue));
    },
  },

  methods: {
    cancel() {
      console.log('cancel');
      this.$router.push('/manager/device');
    },

    async insert() {
      try {
        await insertDevice({
          serial: this.serial,
          name: this.deviceName,
          location: this.location,
          cautionValue: this.cautionValue,
          branchId: this.id,
        });
        this.$router.push('/manager/device');
      } catch (error) {
        this.logMessage = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped></style>

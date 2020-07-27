<template>
  <v-content style="background-color: #F2F3F4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg4>
          <v-card class="elevation-12">
            <v-card-title style="color: white" class="grey darken-2">
              장치 정보 수정
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
              <v-btn text @click="cancel">취소하기</v-btn>
              <v-btn
                text
                color="primary"
                @click="update"
                :disabled="
                  !cautionValueValid ||
                    !minValueValid ||
                    !deviceName ||
                    !serial ||
                    !location ||
                    !cautionValue
                "
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
import { selectDeviceById, updateDeviceById } from '@/api/device';

export default {
  name: 'CompanyAddForm',
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

  async created() {
    try {
      this.id = this.$route.params.id;
      console.log('id: ' + this.id);
      await this.getDeviceById();
    } catch (error) {
      this.logMessage = error.response.data.message;
    }
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
    async getDeviceById() {
      const { data } = await selectDeviceById(this.id);
      this.deviceName = data.name;
      this.serial = data.serial;
      this.location = data.location;
      this.cautionValue = data.cautionValue;
      console.log(data);
    },

    cancel() {
      console.log('cancel');
      this.$router.push('/manager/device');
    },

    async update() {
      try {
        const { data } = await updateDeviceById({
          id: this.id,
          name: this.deviceName,
          location: this.location,
          serial: this.serial,
          minValue: this.minValue,
          maxValue: this.maxValue,
          cautionValue: this.cautionValue,
        });
        console.log(data);
        this.$router.push('/manager/device');
      } catch (error) {
        this.logMessage = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped></style>

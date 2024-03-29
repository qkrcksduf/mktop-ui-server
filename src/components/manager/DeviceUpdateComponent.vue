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
                <v-flex xs6>
                  <v-text-field
                    v-model="maxValue"
                    prepend-icon="mdi-plus"
                    placeholder="최대온도"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="minValue"
                    prepend-icon="mdi-minus"
                    placeholder="최소온도"
                  ></v-text-field>
                  <p class="validation-text">
                    <span class="warn" v-if="minValue && !minValueValid">
                      최소 온도는 최대 온도보다 클 수 없습니다.
                    </span>
                  </p>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    v-model="cautionValue"
                    prepend-icon="mdi-alert-circle"
                    placeholder="위험온도"
                  ></v-text-field>
                  <p class="validation-text float-right">
                    <span
                      class="warn"
                      v-if="cautionValue && !cautionValueValid"
                    >
                      경고 온도는 최대 온도보다 작을 수 없습니다.
                    </span>
                  </p>
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
                    !maxValueValid ||
                    !deviceName ||
                    !serial ||
                    !location ||
                    !cautionValue ||
                    !maxValue ||
                    !minValue
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
    maxValueValid() {
      return Number(this.maxValue) <= Number(this.cautionValue);
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
      this.minValue = data.minValue;
      this.maxValue = data.maxValue;
      console.log(data);
    },

    cancel() {
      console.log('cancel');
      this.$router.push('/manager/device');
    },

    async update() {
      try {
        console.log(this.id);
        const { data } = await updateDeviceById(
          {
            name: this.deviceName,
            location: this.location,
            serial: this.serial,
            minValue: this.minValue,
            maxValue: this.maxValue,
            cautionValue: this.cautionValue,
          },
          this.id,
        );
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

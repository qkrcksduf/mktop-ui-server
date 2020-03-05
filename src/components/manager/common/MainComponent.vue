<template>
  <v-content style="background-color: #F2F3F4">
    <v-container>
      <v-row dense>
        <v-col
          cols="xs6 md4 lg2"
          class="d-flex"
          style="padding: 15px 15px 15px 15px"
        >
          <v-card elevation="12">
            <v-img src="../../../assets/blue.png" height="280">
              <div>
                <v-card-title style="size: 30px">지점 1-1</v-card-title>
              </div>
            </v-img>
            <v-card-title>현재 온도: 180</v-card-title>
          </v-card>
        </v-col>

        <v-col
          cols="xs6 md4 lg2"
          class="d-flex"
          style="padding: 15px 15px 15px 15px"
        >
          <v-card elevation="12">
            <v-img src="../../../assets/blue.png" height="280">
              <v-card-title style="size: 30px">지점 1-2</v-card-title>
            </v-img>
            <v-card-title>현재 온도: 180</v-card-title>
          </v-card>
        </v-col>

        <v-col
          cols="xs6 md4 lg2"
          class="d-flex"
          style="padding: 15px 15px 15px 15px"
        >
          <v-card elevation="12">
            <v-img src="../../../assets/yellow.png" height="280">
              <v-card-title style="size: 30px">지점 1-3</v-card-title>
            </v-img>
            <v-card-title>현재 온도: 204</v-card-title>
          </v-card>
        </v-col>

        <v-col
          cols="xs6 md4 lg2"
          class="d-flex"
          style="padding: 15px 15px 15px 15px"
        >
          <v-card elevation="12">
            <v-img src="../../../assets/blue.png" height="280">
              <v-card-title style="size: 30px">지점 2-1</v-card-title>
            </v-img>
            <v-card-title>현재 온도: 180</v-card-title>
          </v-card>
        </v-col>

        <v-col
          cols="xs6 md4 lg2"
          class="d-flex"
          style="padding: 15px 15px 15px 15px"
        >
          <v-card elevation="12">
            <v-img src="../../../assets/blue.png" height="280">
              <v-card-title style="size: 30px">지점 2-2</v-card-title>
            </v-img>
            <v-card-title>현재 온도: 180</v-card-title>
          </v-card>
        </v-col>

        <v-col
          cols="xs6 md4 lg2"
          class="d-flex"
          style="padding: 15px 15px 15px 15px"
        >
          <v-card elevation="12">
            <v-img src="../../../assets/red.png" height="280">
              <div>
                <v-card-title style="size: 30px">지점 2-3</v-card-title>
              </div>
            </v-img>
            <v-card-title>현재 온도: 243</v-card-title>
          </v-card>
        </v-col>

        <v-col
          cols="xs6 md4 lg2"
          class="d-none"
          style="padding: 15px 15px 15px 15px"
        >
          <v-card elevation="12">
            <v-img src="../../../assets/blue.png" height="280">
              <v-card-title style="size: 30px">지점 7</v-card-title>
            </v-img>
            <v-card-title>현재 온도: 180</v-card-title>
          </v-card>
        </v-col>

        <v-col
          cols="xs6 md4 lg2"
          class="d-none"
          style="padding: 15px 15px 15px 15px"
        >
          <v-card elevation="12">
            <v-img src="../../../assets/blue.png" height="280">
              <v-card-title style="size: 30px">지점 8</v-card-title>
            </v-img>
            <v-card-title>현재 온도: 180</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'MainComponent',
};
</script>

<style scoped></style>

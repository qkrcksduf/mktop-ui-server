<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid style="padding: 30px">
        <v-card class="d-flex pa-2" outlined tile>
          <div>I'm a flexbox conatiner!</div>
        </v-card>

        <v-card class="d-inline-flex pa-2" outlined tile>
          <div>I'm an inline flexbox container!</div>
        </v-card>

        <v-card class="d-flex flex-row mb-6" color="grey lignten-2" flat tile>
          <v-card v-for="n in 3" :key="n" class="pa-2" outlined tile>
            Flex item {{ n }}
          </v-card>
        </v-card>
        <div class="d-flex flex-column mb-6">
          <v-card v-for="n in 3" :key="n" class="pa-2" outlined tile>
            Flex item{{ n }}
          </v-card>

          <v-card
            v-for="j in justify"
            :key="j"
            :class="`d-flex justify-${j} mb-6`"
            color="grey lighten-2"
            flat
            tile
          >
            <v-card v-for="n in 3" :key="n" class="pa-2" outlined tile
              >Flex item</v-card
            >
          </v-card>

          <v-card
            v-for="a in align"
            :key="a"
            :class="`d-flex align-${a} mb-6`"
            color="grey lignten-2"
            flat
            height="100"
            tile
          >
            <v-card v-for="n in 3" :key="n" class="pa-2" outlined tile
              >Flex item</v-card
            >
          </v-card>

          <v-card
            v-for="j in justify"
            :key="j"
            class="d-flex mb-6"
            color="grey lighten-2"
            flat
            height="100"
            tile
          >
            <v-card
              v-for="n in 3"
              :key="n"
              class="pa-2"
              :class="[n === 2 && `align-self-${j}`]"
              outlined
              tile
            >
              {{ n === 2 ? 'Aligned flex item' : 'Flex item' }}
            </v-card>
          </v-card>

          <v-card
            class="d-flex flex-nowrap py-3"
            color="grey lighten-2"
            flat
            tile
            width="125"
          >
            <v-card v-for="n in 5" :key="n" class="pa-2" outlined tile>
              Flex item
            </v-card>
          </v-card>

          <v-card class="d-flex flex-wrap" color="grey lighten-2" flat tile>
            <v-card v-for="n in 20" :key="n" class="pa-2" outlined tile>
              Flex item
            </v-card>
          </v-card>

          <v-card class="d-flex flex-wrap" color="grey lighten-2" flat tile>
            <v-card class="order-2 pa-2" outlined tile>
              First flex item
            </v-card>
            <v-card class="order-3 pa-2" outlined tile>
              Second flex item
            </v-card>
          </v-card>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'FlexComponent',
  data: () => ({
    justify: ['start', 'end', 'center', 'space-between', 'space-around'],
    align: ['start', 'end', 'center', 'baseline', 'stretch'],
  }),
};
</script>

<style scoped></style>

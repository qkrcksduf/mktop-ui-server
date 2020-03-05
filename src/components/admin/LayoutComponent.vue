<template>
  <div>
    <v-navigation-drawer dark v-model="drawer" :clipped="true" app>
      <v-list dense>
        <template v-for="item in items">
          <v-list-item :key="item.text" :to="item.url">
            <v-list-item-action :to="item.url">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="true" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="color: white">
        <v-btn style="font-size: 20px" @click="logoLink">MKTOP</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="isLogin">
        <h3>{{ $store.state.name }}님</h3>
      </span>
      <h3 v-if="isLogin">
        <v-btn @click="logout"> <h3>로그아웃</h3></v-btn>
      </h3>
      <!--      <v-btn @click="test" icon>-->
      <!--        <v-icon>mdi-heart</v-icon>-->
      <!--      </v-btn>-->
      <!--      <v-btn icon>-->
      <!--        <v-icon>mdi-magnify</v-icon>-->
      <!--      </v-btn>-->
    </v-app-bar>
  </div>
</template>
<script>
import { deleteCookie } from '@/utils/cookies';

export default {
  name: 'TestComponent',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    logoLink() {
      try {
        this.$store.getters.isLogin
          ? this.$router.push('/admin/main')
          : this.$router.push('/login');
      } catch (e) {
        console.log('test');
        console.log(e);
      }
    },
    logout() {
      this.$store.commit('clearName');
      this.$store.commit('clearToken');
      deleteCookie('user');
      deleteCookie('auth');
      this.$router.push('/login');
    },
    test() {
      console.log('test');
    },
  },
  data: () => ({
    drawer: true,
    items: [
      { icon: 'mdi-home', text: '메인 화면', url: '/admin/main' },
      { icon: 'mdi-plus', text: '회사 추가', url: '/admin/company-add' },
    ],
  }),
};
</script>

<style scoped></style>

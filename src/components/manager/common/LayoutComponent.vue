<template>
  <div>
    <v-navigation-drawer dark v-model="drawer" :clipped="true" app>
      <v-list dense>
        <v-list-item to="/manager/main">
          <v-list-item-action>
            <v-icon>
              mdi-home
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>
            메인 화면
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/manager/company">
          <v-list-item-action>
            <v-icon>
              mdi-domain
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>
            회사 관리
          </v-list-item-title>
        </v-list-item>
        <v-list-group prepend-icon="mdi-account" no-action>
          <template v-slot:activator>
            <v-list-item-title>계정 관리</v-list-item-title>
          </template>
          <v-list-item to="/manager/account/info-update">
            <v-list-item-title>
              계정 정보 변경
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/manager/account/password-update">
            <v-list-item-title>
              비밀번호 변경
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/manager/branch">
          <v-list-item-action>
            <v-icon>
              mdi-package
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>
            지점 관리
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="true" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!--      <router-link>-->
      <v-toolbar-title style="color: white">
        <v-btn style="font-size: 20px" @click="logoLink">MKTOP</v-btn>
      </v-toolbar-title>
      <!--      </router-link>-->
      <v-spacer></v-spacer>
      <span v-if="isLogin">
        <h3>{{ $store.state.name }}님</h3>
      </span>
      <h3 v-if="isLogin">
        <v-btn @click="logout"> <h3>로그아웃</h3></v-btn>
      </h3>
    </v-app-bar>
  </div>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';

export default {
  name: 'LayoutComponent',
  data() {
    return {
      active: true,
      drawer: 'true',
      items: [
        {
          icon: 'mdi-home',
          text: '메인 화면',
          url: '/manager/main',
          tree: null,
        },
        {
          icon: 'mdi-domain',
          text: '회사 관리',
          url: '/manager/company',
          tree: null,
        },
        {
          icon: 'mdi-account',
          text: '계정 관리',
          url: '/manager/account',
          tree: null,
        },
        {
          icon: 'mdi-package',
          text: '지점 관리',
          url: '/manager/branch',
          tree: null,
        },
      ],
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    logoLink() {
      try {
        return this.$store.getters.isLogin
          ? this.$router.push('/manager/main')
          : this.$router.push('/login');
      } catch (e) {
        console.log('test');
        console.log(e);
      }
    },
    logout() {
      this.$store.commit('clearToken');
      this.$store.commit('clearName');
      deleteCookie('user');
      deleteCookie('auth');
      deleteCookie('company');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped></style>

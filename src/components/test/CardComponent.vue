<template>
  <v-app id="inspire">
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
      <v-toolbar-title style="color: white">
        <v-btn style="font-size: 20px" @click="logoLink">MKTOP</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu style="padding-right: 30px" transition="scale-transaction">
        <template v-slot:activator="{ on }">
          <v-btn color="gray" dark v-on="on">
            <h3>
              지점 선택
            </h3>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in list" :key="i" @click="test">
            <v-list-item-title> {{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <span v-if="isLogin" style="padding-left: 10px">
        <h3>{{ $store.state.name }}님</h3>
      </span>
      <h3 v-if="isLogin">
        <v-btn @click="logout"> <h3>로그아웃</h3></v-btn>
      </h3>
    </v-app-bar>
    <v-content style="background-color: #F2F3F4">
      <v-container fluid style="padding: 30px">
        <v-row>
          <v-col cols="12">
            <v-row align="start" justify="start">
              <template align="start" justify="start">
                <v-card max-width="344" class="mx-auto">
                  <v-img height="250" src="../../assets/blue.png"></v-img>
                  <v-card-title>대전 유성점 - 솥1</v-card-title>
                  <v-card-text>
                    <div class="my4 subtitle-2">
                      현재 온도 = 180&deg;C, 측정 시간 = 12:30
                    </div>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <v-card max-width="344" class="mx-auto">
                  <v-img height="250" src="../../assets/yellow.png"></v-img>
                  <v-card-title>대전 유성점 - 솥2</v-card-title>
                  <v-card-text>
                    <div class="my4 subtitle-2">
                      현재 온도 = 180&deg;C, 측정 시간 = 12:30
                    </div>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>

                <v-card max-width="344" class="mx-auto">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline"
                        >대전 봉명점 - 솥1</v-list-item-title
                      >
                      <v-list-item-subtitle>12:30 PM</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-card-text>
                    <v-row align="center">
                      <v-col class="display-3" cols="8">
                        240&deg;C
                      </v-col>
                      <v-col cols="4">
                        <v-img
                          src="../../assets/blue.png"
                          alt="Sunny image"
                          width="92"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card max-width="344" class="mx-auto">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline"
                        >대전 봉명점 - 솥2</v-list-item-title
                      >
                      <v-list-item-subtitle>12:30 PM</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-card-text>
                    <v-row align="center">
                      <v-col class="display-3" cols="8">
                        240&deg;C
                      </v-col>
                      <v-col cols="4">
                        <v-img
                          src="../../assets/yellow.png"
                          alt="Sunny image"
                          width="92"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card max-width="344" class="mx-auto">
                  <v-list-item>
                    <v-list-item-avatar color="dark blue"></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="headline"
                        >대전 월평점 - 솥1</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-img
                    src="../../assets/kakao.png"
                    max-height="225"
                    style="margin: 30px"
                  ></v-img>

                  <v-card-subtitle>
                    현재 온도 = 180&deg;C, 측정 시간 = 12:30
                  </v-card-subtitle>
                </v-card>
                <v-card max-width="344" class="mx-auto">
                  <v-list-item>
                    <v-list-item-avatar color="red"></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="headline"
                        >대전 월평점 - 솥1</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-img
                    src="../../assets/khy.png"
                    max-height="225"
                    style="margin: 30px"
                  ></v-img>

                  <v-card-subtitle>
                    현재 온도 = 180&deg;C, 측정 시간 = 12:30
                  </v-card-subtitle>
                </v-card>
              </template>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';

export default {
  name: 'LayoutComponent',
  data() {
    return {
      selection: 1,
      list: [
        { title: '지점 1' },
        { title: '지점 2' },
        { title: '지점 3' },
        { title: '지점 4' },
        { title: '지점 5' },
      ],
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
    reserve() {
      console.log('test');
    },
    test() {
      console.log('test');
    },

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

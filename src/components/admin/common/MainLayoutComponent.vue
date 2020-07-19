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
      <v-menu transition="scale-transaction" bottom right>
        <template v-slot:activator="{ on }">
          <v-btn color="grey" dark v-on="on"
            ><h3>지점 선택</h3>
            <v-icon>mdi-menu-down</v-icon></v-btn
          >
        </template>
        <v-list>
          <v-list-item
            v-for="item in branchList"
            :key="item.id"
            @click="sendEvent(item.id, item.branchName)"
          >
            <v-list-item-title> {{ item.branchName }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';
import { selectBranchList } from '@/api/branch';
import { eventBus } from '@/utils/eventBus';
import { end } from '@/utils/mqtt.client';

export default {
  name: 'LayoutComponent',
  async created() {
    const { data } = await selectBranchList();
    for (let i = 0; i < data.length; i++) {
      let branch = {
        id: data[i].id,
        branchName: data[i].name,
      };
      this.branchList.push(branch);
    }
  },

  data() {
    return {
      logMessage: '',
      branchList: [{ branchName: '모든 지점' }],
      active: true,
      drawer: 'true',
      items: [
        {
          icon: 'mdi-home',
          text: '메인 화면',
          url: '/admin/main',
        },
        {
          icon: 'mdi-domain',
          text: '회사 관리',
          url: '/admin/company-update',
        },
        {
          icon: 'mdi-account',
          text: '계정 관리',
          url: '/admin/account',
        },
        {
          icon: 'mdi-package',
          text: '지점 관리',
          url: '/admin/branch',
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
    test() {
      console.log('test');
    },

    sendEvent(branchId, branchName) {
      let branch = {
        id: branchId,
        name: branchName,
      };
      eventBus.$emit('selectDevice', branch);
    },

    logoLink() {
      try {
        return this.$store.getters.isLogin
          ? this.$router.push('/admin/main')
          : this.$router.push('/login');
      } catch (e) {
        console.log(e);
      }
    },

    logout() {
      end();
      this.$store.commit('clearToken');
      this.$store.commit('clearName');
      deleteCookie('user');
      deleteCookie('auth');
      deleteCookie('company');
      deleteCookie('user_id');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped></style>

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
        <v-list-item to="/manager/company-update">
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
          url: '/manager/main',
          tree: null,
        },
        {
          icon: 'mdi-domain',
          text: '회사 관리',
          url: '/manager/company-update',
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
    test() {
      console.log('test');
    },

    sendEvent(branchId, branchName) {
      let branch = {
        id: branchId,
        name: branchName,
      };
      eventBus.$emit('selectBranch', branch);
    },

    logoLink() {
      try {
        return this.$store.getters.isLogin
          ? this.$router.push('/manager/main')
          : this.$router.push('/login');
      } catch (e) {
        console.log(e);
      }
    },

    logout() {
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

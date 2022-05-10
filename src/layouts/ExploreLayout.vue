<template>
    <q-layout view="lHh Lpr lFf">
      <q-header class="chop__primary q-pa-sm" elevated>
        <q-toolbar>
          <q-toolbar-title
              class="cursor-pointer"
              @click="$router.back()">
              Chops
              App
              </q-toolbar-title
          >
          <CartButton />
          <q-btn
              v-if="clientIsLoggedIn"
              @click="goToDashboard"
              label="View Dashboard"
              color="dark"
          />
          <q-btn v-else @click="goToLogin" label="Get Started" color="dark" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
</template>

<script>
import { mapState } from 'pinia';
import { useMainStore } from 'src/stores/mainStore';
import { defineComponent } from 'vue';
import CartButton from 'src/components/Explore/Cart.vue';
import { Cookies } from 'quasar';

const ExploreLayout = defineComponent({
  name: 'ExploreLayout',
  components: {
    CartButton,
  },
  computed: {
    ...mapState(useMainStore, ['clientId', 'token']),
    clientIsLoggedIn() {
      return Number(this.clientId) && Cookies.get('token');
    },
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'auth' });
    },
    goToDashboard() {
      this.$router.push({ name: 'dashboard' });
    },
  },
});

export default ExploreLayout;
</script>

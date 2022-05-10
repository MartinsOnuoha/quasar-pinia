<!-- layout/pages that holds our constructed components, visible to the user-->
<template>
  <q-page class="full-height">
    <div class="row window-height">
      <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 flex flex-center">
        <Login @hide-login="handleHideLogin" v-if="showLogin" />
        <Register @show-login="handleShowLogin" v-else />
      </div>
      <div class="right-bg col chop__primary"></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Login from 'components/Auth/Login.vue';
import Register from 'components/Auth/Register.vue';

const AuthPage = defineComponent({
  name: 'AuthPage',
  components: {
    Login,
    Register,
  },
  data() {
    return {
      showLogin: false,
    };
  },
  methods: {
    handleShowLogin() {
      this.showLogin = true;
    },
    handleHideLogin() {
      this.showLogin = false;
    },
  },
});
export default AuthPage;
</script>

<style lang="scss">
.right-bg {
  background-image: url("https://s3.envato.com/files/311170217/116_E39A3235.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>

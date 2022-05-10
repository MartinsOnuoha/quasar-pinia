<template>
  <div class="register">
    <h4>Create an account</h4>
    <q-card class="q-pa-md" flat bordered>
      <q-card-section>
        <div class="q-mb-xl">
          What Kind of Account would you like?
          <q-radio v-model="accountType" val="restaurant" label="Restaurant" />
          <q-radio v-model="accountType" val="client" label="Client" />
        </div>
        <ClientForm @submitted="handleSubmitted" v-if="isClient" />
        <RestaurantForm @submitted="handleSubmitted" v-else />
      </q-card-section>
    </q-card>
    <q-btn
      flat
      color="primary"
      label="Already have an account"
      @click="goToLoginPage"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useMainStore } from 'stores/mainStore';
import { mapActions } from 'pinia';
import ClientForm from './ClientAuthForm.vue';
import RestaurantForm from './RestaurantAuthForm.vue';

// <!-- imported client and restaurant form component to use in register component -->
const RegisterPage = defineComponent({
  name: 'RegisterPage',
  components: {
    ClientForm,
    RestaurantForm,
  },
  data() {
    return {
      accountType: 'client',
    };
  },
  computed: {
    isClient() {
      return this.accountType === 'client';
    },
  },
  methods: {
    ...mapActions(useMainStore, ['register']),
    async handleSubmitted(payload) {
      const requestWasSuccessful = await this.register(
        payload,
        this.accountType,
      );
      if (requestWasSuccessful === true) {
        this.$router.replace({ name: 'profile' });
      }
    },
    goToLoginPage() {
      this.$emit('show-login');
    },
  },
});

export default RegisterPage;
</script>

<style lang="scss">
.register {
  width: 500px;
}
</style>

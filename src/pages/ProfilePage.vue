<template>
  <q-page class="flex items-center column q-pa-md">
    <h4>Update Your Profile</h4>
    <ClientForm v-if="isClient"/>
    <RestaurantForm v-else/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import ClientForm from 'components/Profile/ClientProfileForm.vue';
import RestaurantForm from 'components/Profile/RestaurantProfileForm.vue';
import { useMainStore } from 'stores/mainStore';
import { mapActions } from 'pinia';

const ProfilePage = defineComponent({
  name: 'ProfilePage',
  components: {
    ClientForm,
    RestaurantForm,
  },
  computed: {
    isClient() {
      return this.getAccountType() === 'client';
    },
    isRestaurant() {
      return this.getAccountType() === 'restaurant';
    },
  },
  methods: {
    ...mapActions(useMainStore, ['getAccountType']),
  },
});
export default ProfilePage;
</script>

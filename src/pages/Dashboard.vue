<template>
  <q-page class="flex flex-center column">
    <div class="text-h3 q-mb-md">
      <span v-if="isClient && clientDetails">
        Hi, {{ clientDetails.lastName }}👋</span
      >
      <span v-if="isRestaurant && restaurantDetails">
        Hi, {{ restaurantDetails.name }}👋</span
      >
    </div>
    <ClientDashboardInfo v-if="isClient && clientDetails" />
    <RestaurantDashboardInfo v-if="isRestaurant && restaurantDetails" />
    <img
      class="desktop-only"
      alt="chop-app logo"
      src="https://media.istockphoto.com/vectors/order-grocery-online-vector-id1222105389?k=20&m=1222105389&s=612x612&w=0&h=BTcym-zKExEzoBh98z4Dmi5L-diDT6lUiSTQCacYigM="
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import ClientDashboardInfo from 'components/Dashboard/ClientDashboardInfo.vue';
import RestaurantDashboardInfo from 'components/Dashboard/RestaurantDashboardInfo.vue';
import { mapActions, mapState } from 'pinia';
import { useMainStore } from 'stores/mainStore';

export default defineComponent({
  name: 'IndexPage',
  components: {
    ClientDashboardInfo,
    RestaurantDashboardInfo,
  },
  computed: {
    ...mapState(useMainStore, [
      'clientDetails',
      'restaurantDetails',
      'restaurantId',
      'clientId',
    ]),
    isClient() {
      return this.getAccountType() === 'client';
    },
    isRestaurant() {
      return this.getAccountType() === 'restaurant';
    },
  },
  mounted() {
    /*   //  It is most often used tosend an HTTP request to
  fetch datathat the component will then render. // */
    if (this.getAccountType() === 'client') {
      this.getClient();
      this.getOrders();
    }
    if (this.getAccountType() === 'restaurant') {
      this.getRestaurant(this.restaurantId);
      this.getMenus();
    }
  },
  methods: {
    ...mapActions(useMainStore, [
      'getClient',
      'getRestaurant',
      'getOrders',
      'getAccountType',
      'getMenus',
    ]),
  },
});
</script>

<template>
  <q-card bordered flat v-if="restaurantDetails">
    <q-card-section>
      <div class="text-center">
        <q-avatar size="100px" color="teal" text-color="white">
          <img v-if="restaurantDetails.imageUrl" :src="restaurantDetails.imageUrl" alt="">
          {{ restaurantDetails.name[0] }}
        </q-avatar>
        <div class="text-h4 q-mt-md">{{ restaurantDetails.name  }}</div>
        <div class="text-subtitle q-mt-md">{{ restaurantDetails.bio  }}</div>
        <div class="text-subtitle2">{{ restaurantDetails.address }}</div>
        <div class="text-subtitle2">{{ restaurantDetails.city }}</div>
        <div class="text-body q-mt-md">{{ restaurantDetails.phoneNum }}</div>
        <div class="text-body">{{ restaurantDetails.email }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from 'src/stores/mainStore';
import { defineComponent } from 'vue';

const RestaurantDetails = defineComponent({
  name: 'RestaurantDetails',
  props: ['id'],
  computed: {
    ...mapState(useMainStore, ['restaurantDetails']),
  },
  mounted() {
    this.getRestaurantDetails();
  },
  methods: {
    ...mapActions(useMainStore, ['getRestaurant']),
    async getRestaurantDetails() {
      await this.getRestaurant(this.id);
    },
  },
});
export default RestaurantDetails;
</script>

<style scoped>
</style>

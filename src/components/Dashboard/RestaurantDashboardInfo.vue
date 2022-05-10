<template>
  <q-card class="my-card">
    <q-card-section class="text-body1">
      <q-icon size="30px" name="inventory_display" />
      You have {{ totalMenus }} Menus
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useMainStore } from 'stores/mainStore';

const RestaurantDashboardInfo = defineComponent({
  name: 'RestaurantDashboardInfo',
  computed: {
    ...mapState(useMainStore, ['totalMenus']),
  },
});
export default RestaurantDashboardInfo;
</script>

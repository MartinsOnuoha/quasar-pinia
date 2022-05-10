<template>
  <q-card>
    <q-card-section class="text-body1">
      <q-icon size="30px" name="shopping_cart" />
      You have {{ getTotalOrders }} Orders
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useMainStore } from 'stores/mainStore';

const ClientDashboardInfo = defineComponent({
  name: 'ClientDashboardInfo',
  computed: {
    ...mapState(useMainStore, ['getTotalOrders']),
  },
});
export default ClientDashboardInfo;
</script>

<template>
  <q-page class="flex items-center column" padding>
    <h4 v-if="isRestaurant">Manage Orders</h4>
    <h4 v-else>Your Orders</h4>
    <q-list
      :class="[
        'ordersList',
        $q.platform.is.mobile ? 'full-width' : 'ordersList__width',
      ]"
    >
      <q-item class="q-mb-md" v-for="(item, index) in orders" :key="index">
        <q-item-section avatar>
          <q-icon name="shopping_cart" />
        </q-item-section>
        <q-item-section class="">
          <span class="text-bold">
            ({{ item.items.length }}) Items Ordered On:
          </span>
          {{ item.createdAt }}
        </q-item-section>
        <q-item-section side top>
          <q-badge color="teal" :label="getStatus(item)" />
          <div :class="['flex', $q.platform.is.mobile? 'column' : false]">
            <q-btn
              color="negative"
              :disable="item.isCancelled || item.isComplete"
              label="Cancel Order"
              @click="cancel(item.orderId)"
              size="sm"
              class="q-mt-md q-mr-sm"
              no-caps
            />
            <q-btn
              color="positive"
              v-if="isRestaurant"
              :disable="item.isConfirmed || item.isCancelled"
              label="Confirm Order"
              @click="confirm(item.orderId)"
              size="sm"
              class="q-mt-md q-mr-sm"
              no-caps
            />
            <q-btn
              color="dark"
              v-if="isRestaurant"
              :disable="item.isComplete || item.isCancelled"
              label="Complete Order"
              @click="confirm(item.orderId)"
              size="sm"
              class="q-mt-md"
              no-caps
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from 'src/stores/mainStore';
import { defineComponent } from 'vue';

const OrdersPage = defineComponent({
  name: 'OrdersPage',
  computed: {
    ...mapState(useMainStore, ['orders', 'restaurantId', 'clientId']),
    isRestaurant() {
      if (Number(this.restaurantId)) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    ...mapActions(useMainStore, ['getOrders', 'updateOrder']),
    getStatus(item) {
      if (item.isCancelled) {
        return 'cancelled';
      }
      if (item.isComplete) {
        return 'completed';
      }
      if (item.isConfirmed) {
        return 'confirmed';
      }
      return 'pending';
    },
    async cancel(orderId) {
      const payload = {
        orderId,
        cancelOrder: true,
      };
      await this.updateOrder(payload);
      await this.getOrders();
    },
    async confirm(orderId) {
      const payload = {
        orderId,
        confirmOrder: true,
      };
      await this.updateOrder(payload);
      await this.getOrders();
    },
    async complete(orderId) {
      const payload = {
        orderId,
        completeOrder: true,
      };
      await this.updateOrder(payload);
      await this.getOrders();
    },
  },
});
export default OrdersPage;
</script>

<style lang="scss">
.ordersList {
  &__width {
    width: 650px;
  }
  .q-item {
    border: 1px solid rgb(193, 193, 193);
    border-radius: 5px;
  }
}
</style>

<template>
  <div>
    <q-btn @click="open = true" icon="shopping_cart" class="q-mr-md" flat round color="white">
      <q-badge color="red" floating>{{ cart.length }}</q-badge>
    </q-btn>
    <q-dialog v-model="open">
      <q-card class="cartCard">
        <q-card-section>
          <div class="text-h6">My Cart ( {{ cart.length }} )</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list bordered>
            <q-item v-for="(item, index) in cart" :key="index" clickable v-ripple>
              <q-item-section avatar>
                <q-avatar rounded>
                  <img :src="item.imageUrl">
                </q-avatar>
              </q-item-section>
              <q-item-section>{{ item.name }}</q-item-section>
              <q-item-section side top>
                <q-badge color="teal" :label="`$${item.price}`" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
              class="full-width"
              @click="placeOrder"
              no-caps
              label="Place Order"
              color="dark"
              v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from 'src/stores/mainStore';
import { defineComponent } from 'vue';

const CartButton = defineComponent({
  name: 'CartButton',
  computed: {
    ...mapState(useMainStore, ['cart']),
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    ...mapActions(useMainStore, ['placeClientOrder']),
    placeOrder() {
      if (this.cart.length) {
        const payload = {
          restaurantId: this.cart[0].restaurantId,
          items: this.cart.map((item) => item.menuId),
        };
        this.placeClientOrder(payload);
      }
    },
  },
});
export default CartButton;
</script>

<style lang="scss">
  .cartCard {
    width: 450px;
  }
</style>

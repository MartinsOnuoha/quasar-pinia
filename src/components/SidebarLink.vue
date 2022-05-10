<template>
  <!-- add "hidden" class if the menu item is for restaruant only with tenary operator -->
  <q-item
    :class="[
      'text-subtitle1',
      forRestaurantOnly && accountType === 'client' ? 'hidden' : false,
      forClientOnly && accountType === 'restaurant' ? 'hidden' : false
    ]"
    clickable
    @click="handleClicked"
    :to="{ name: to }"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SidebarLink',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: 'auth',
    },
    forClientOnly: {
      type: Boolean,
      default: false,
    },
    forRestaurantOnly: {
      type: Boolean,
      default: false,
    },
    accountType: {
      type: String,
    },
  },
  methods: {
    handleClicked() {
      this.$emit('clicked', this.to);
    },
  },
});
</script>

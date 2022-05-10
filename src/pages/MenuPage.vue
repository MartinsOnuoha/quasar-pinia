<template>
  <q-page class="flex" padding>
    <div class="q-mb-md">
      <q-btn
        @click="showCreateMenu"
        v-if="restaurantId"
        label="Show Menu"
        color="dark"
      />
    </div>
    <CreateMenu v-if="showForm" />
    <MenuList />
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import MenuList from 'components/Menu/MenuList.vue';
import CreateMenu from 'components/Menu/CreateMenu.vue';

const MenuPage = defineComponent({
  name: 'MenuPage',
  components: {
    MenuList,
    CreateMenu,
  },
  data() {
    return {
      showForm: true,
    };
  },
  computed: {
    restaurantId() {
      return this.showForm === 'restaurant';
    },
  },
  methods: {
    showCreateMenu() {
      this.showForm = true;
    },
  },
});
export default MenuPage;
</script>

<style lang="sass" scoped></style>

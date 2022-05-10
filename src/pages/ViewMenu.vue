<template>
  <q-page padding>
    <RestaurantDetails :id="restaurantId" />
    <MenuList :id="restaurantId" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import MenuList from 'components/Menu/MenuList.vue';
import RestaurantDetails from 'components/Explore/RestaurantDetails.vue';

const ViewMenu = defineComponent({
  name: 'ViewMenu',
  props: ['restaurantId'],
  components: {
    MenuList,
    RestaurantDetails,
  },
});
export default ViewMenu;
</script>

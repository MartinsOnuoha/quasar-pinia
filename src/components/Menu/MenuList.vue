<template>
  <div class="column">
    <q-card bordered flat class="menuList q-mt-md full-width">
      <q-card-section>
        <h6>Menu List</h6>
        <div v-if="menus.length" class="row q-gutter-md">
          <div
            class="col-md-3 col-lg-3 col-xl-3 col-xs-12 col-sm-12"
            v-for="(item, index) in menus"
            :key="index"
          >
            <q-card bordered flat>
              <q-img height="200px" :src="item.imageUrl">
                <div class="absolute-bottom text-subtitle2 text-center">
                  {{ item.name }} - {{ item.price }}
                  <div>
                    {{ item.description }}
                  </div>
                  <div>
                    <q-btn
                      @click="deleteItem(item.id)"
                      v-if="canUpdateAndDelete(item.restaurantId)"
                      icon="delete"
                      rounded
                      flat
                    />
                    <q-btn
                      @click="editItem(item)"
                      v-if="canUpdateAndDelete(item.restaurantId)"
                      icon="edit"
                      rounded
                      flat
                    />
                    <q-btn
                      class="q-mt-lg"
                      size="sm"
                      @click="add(item)"
                      v-if="canAddToCart"
                      color="amber"
                      icon="shopping_cart"
                      label="Add to cart"
                    />
                  </div>
                </div>
              </q-img>
            </q-card>
          </div>
        </div>
        <div v-else>No menu items yet</div>
      </q-card-section>
    </q-card>
    <UpdateMenu
      :isActive="showPopup"
      :menuItem="selectedItem"
      @close="closePopup"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useMainStore } from 'stores/mainStore';
import UpdateMenu from 'components/Menu/UpdateMenu.vue';

const MenuList = defineComponent({
  name: 'MenuList',
  props: ['id'],
  components: {
    UpdateMenu,
  },
  data() {
    return {
      showPopup: false,
      selectedItem: null,
    };
  },
  computed: {
    ...mapState(useMainStore, ['restaurantId', 'clientId', 'menus', 'token']),
    canAddToCart() {
      if (Number(this.clientId) && this.token) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    const id = this.id || this.restaurantId;
    this.getMenus(id);
  },
  methods: {
    ...mapActions(useMainStore, [
      'getMenus',
      'deleteMenu',
      'getRestaurant',
      'addToCart',
    ]),
    canUpdateAndDelete(restaurantId) {
      return this.restaurantId && this.restaurantId === restaurantId;
    },
    goToLogin() {
      this.$router.push({ name: 'auth' });
    },
    async deleteItem(menuId) {
      const payload = {
        menuId,
      };
      await this.deleteMenu(payload);
    },
    add(item) {
      this.addToCart(item);
    },
    editItem(item) {
      this.selectedItem = item;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
  },
});

export default MenuList;
</script>

<style>
.menuList {
  width: 100%;
}
</style>

<template>
  <q-page class="column" padding>
    <h4>Your favourites tastes, delivered.</h4>
    <h5>Explore Restaurants</h5>
    <div class="row q-col-gutter-md">
      <div
        class="col-md-3 col-lg-3 col-xl-3 col-xs-12 col-sm-12"
        v-for="(item, index) in restaurants"
        :key="index"
      >
        <q-card bordered flat>
          <q-img height="200px" :src="item.bannerUrl">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ item.name }} - {{ item.phoneNum }}
              <div class="q-mt-md">
                <q-btn
                  @click="goToMenu(item.restaurantId)"
                  label="View Menu"
                  color="dark"
                />
              </div>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useMainStore } from 'stores/mainStore';

const ExplorePage = defineComponent({
  name: 'ExplorePage',
  data() {
    return {};
  },
  computed: {
    ...mapState(useMainStore, ['restaurants']),
  },
  async mounted() {
    await this.getRestaurant();
  },
  methods: {
    ...mapActions(useMainStore, ['getRestaurant']),
    goToMenu(id) {
      this.$router.push({ name: 'view-menu', params: { restaurantId: id } });
    },
  },
});
export default ExplorePage;
</script>

<style lang="scss">
// .right-bg {
//   background-image: url("https://cdn.dribbble.com/users/283823/screenshots/10829285/media/8185d7546a272ed31b70bc7665498b0b.png");
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: cover;
// }
</style>

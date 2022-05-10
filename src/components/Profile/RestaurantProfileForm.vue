<template>
  <q-card class="restaurantProfileForm">
    <q-card-section>
      <q-form @submit="handleSubmit" class="q-gutter-md">
        <q-input
          dense
          v-model="form.name"
          type="text"
          label="Name"
          outlined
        />
        <q-input
          dense
          v-model="form.address"
          type="text"
          label="Address"
          outlined
        />
        <q-input
          dense
          v-model="form.bannerUrl"
          type="text"
          label="Bannerurl"
          outlined
        />
        <q-input
          dense
          v-model="form.bio"
          type="text"
          label="Bio"
          outlined
        />
        <q-input
          dense
          v-model="form.cityName"
          type="text"
          label="City"
          outlined
        />
        <q-input
          dense
          v-model="form.email"
          type="text"
          label="Email"
          outlined
        />
        <q-input
          dense
          v-model="form.Phonenumber"
          type="text"
          label="Phone number"
          outlined
        />
        <div>
          <q-btn
            :disable="!formIsValid"
            label="Update Profile"
            type="submit"
            color="dark"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useMainStore } from 'stores/mainStore';

const RestaurantProfileForm = defineComponent({
  name: 'RestaurantProfileForm',
  data() {
    return {
      form: {
        name: '',
        address: '',
        cityName: '',
        email: '',
        phoneNum: '',
        bannerUrl: '',
        bio: '',
        profileUrl: '',

      },
      optionalFields: [
        'bannerUrl',
        'bio',
        'profileUrl',
      ],
      accountType: null,
    };
  },
  computed: {
    ...mapState(useMainStore, ['restaurantDetails', 'restaurantId']),
    formIsValid() {
      return (
        !!this.form.name
        && !!this.form.address
        && !!this.form.cityName
        && !!this.form.email
      );
    },
  },
  async mounted() {
    this.accountType = this.getAccountType();
    await this.getRestaurant(this.restaurantId);
    this.setDefaultValues();
  },
  methods: {
    ...mapActions(useMainStore, ['getRestaurant', 'getAccountType', 'updateProfile']),
    setDefaultValues() {
      this.form.name = this.restaurantDetails.name;
      this.form.address = this.restaurantDetails.address;
      this.form.cityName = this.restaurantDetails.cityName;
      this.form.email = this.restaurantDetails.email;
      this.form.phoneNum = this.restaurantDetails.phoneNum;
    },
    async handleSubmit() {
      const payload = this.form;
      Object.keys(payload).forEach((key) => {
        if (!payload[key] && this.optionalFields.includes(key)) {
          delete payload[key];
        }
      });
      await this.updateProfile(this.form, this.accountType);
    },
  },
});
export default RestaurantProfileForm;
</script>

<style lang="scss">
.clientProfileForm {
  width: 500px;
}
</style>

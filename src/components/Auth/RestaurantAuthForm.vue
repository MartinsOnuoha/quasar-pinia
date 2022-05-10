<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input dense outlined v-model="form.name" type="text" label="Restaurant's name" />
    <q-input dense outlined v-model="form.address" type="text" label="Restaurant's address" />
    <q-input dense outlined v-model="form.bannerUrl" type="url" label="BannerUrl"/>
    <q-input dense outlined v-model="form.bio" type="text" label="Business tagline" />
    <q-input dense outlined v-model="form.city" type="text" label="City" />
    <q-input dense outlined v-model="form.email" type="email" label="Email" />
    <q-input dense outlined v-model="form.password" type="password" label="Password" />
    <q-input dense outlined v-model="confirmPassword" type="password" label="Confirm Password" />
    <q-input
      dense
      outlined
      v-model="form.phoneNum"
      type="text"
      label="Phone-number"
      mask="###-###-####"
      hint="example: 000 - 000 - 0000" />
    <q-input dense outlined v-model="form.profileUrl" type="url" label="ProfileUrl" />
    <div>
      <q-btn
        class="full-width"
        label="Create Account"
        type="submit"
        color="black"
        :disable="!restaurantFormIsValid"
      />
    </div>
  </q-form>
</template>

<script>
import { defineComponent } from 'vue';

const RestaurantForm = defineComponent({
  name: 'RestaurantForm',
  data() {
    return {
      form: {
        name: '',
        address: '',
        bannerUrl: '',
        bio: '',
        city: '',
        email: '',
        password: '',
        phoneNum: '',
        profileUrl: '',
      },
      confirmPassword: '',
      optionalFields: [
        'bannerUrl', 'profileUrl', 'restaurantId',
      ],
    };
  },
  computed: {
    restaurantFormIsValid() {
      if (
        this.form.name && this.form.address && this.form.bio && this.form.city
        && this.form.email && this.form.phoneNum && this.form.password
        && this.confirmPassword && this.form.password === this.confirmPassword) {
        return true;
      }
      return false;
    },
  },
  methods: {
    onSubmit() {
      // check if any form property is empty
      // then check if that empty property is part of the optional fields
      const payload = this.form;
      Object.keys(payload).forEach((key) => {
        if (!payload[key] && this.optionalFields.includes(key)) {
          delete payload[key];
        }
      });
      this.$emit('submitted', payload);
    },
  },
});
/*
COMPONENT
  -> data
    -> data properties that we bind to elements
  -> computed
    -> evaluate either data properties or methods
  -> methods
    -> define component actions / response to events
  -> created
    -> lifecycle hook
  -> mounted
    -> lifecycle hook

*/
export default RestaurantForm; // it means i want to use it somewhere else
</script>

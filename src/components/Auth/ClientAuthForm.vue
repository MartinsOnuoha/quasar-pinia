<!-- New client registration form page, template is from quasar-->
<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input dense outlined v-model="email" type="email" label="Email" />
    <q-input dense outlined v-model="username" type="text" label="Username" />
    <q-input dense outlined v-model="firstName" type="text" label="Firstname" />
    <q-input dense outlined v-model="lastName" type="text" label="Lastname" />

    <q-input
      dense
      outlined
      v-model="password"
      type="password"
      label="Password"
    />
    <q-input
      outlined
      v-model="c_password"
      dense
      type="password"
      label="Confirm Password"
    />
    <div>
      <q-btn
        class="full-width"
        label="Create Account"
        type="submit"
        color="black"
        :disable="!clientFormIsValid"
      />
      <!-- the button should be disabled if the value of clientFormIsValid is true.
      This means only when the form the form is currently filled should the button be clickable -->
    </div>
  </q-form>
</template>

<!-- personal note: my learning ref https://www.section.io/engineering-education/getting-started-with-quasar-framework/  -->

<script>
/* eslint-disable operator-linebreak */
import { defineComponent } from 'vue';

const ClientForm = defineComponent({ // lingo: defined vue instance
  name: 'ClientForm',
  data() {
    return {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      c_password: '',
    };
  },
  /* <!-- why computed? it has cache, & the ability to check for changes in dependecies --> */
  computed: {
    clientFormIsValid() {
      if (
        this.email &&
        this.username &&
        this.firstName &&
        this.lastName &&
        this.password &&
        this.password === this.c_password
      ) {
        return true;
      }
      return false;
    },
  },
  methods: { // listens for events that doesnt need 'computing' from template
    onSubmit() {
      const payload = {
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
      };
      this.$emit('submitted', payload); // emit - the message / output that goes out to the parent component -register
    },
  },
});
export default ClientForm;
</script>

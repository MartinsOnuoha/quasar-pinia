<template>
  <q-card bordered flat class="menuList">
    <q-card-section>
      <h6>Create Menu</h6>
      <q-form @submit="handleSubmitted" class="q-gutter-md">
        <q-input
          dense
          v-model="form.name"
          type="text"
          label="Name"
          outlined
        />
        <q-input
          dense
          v-model="form.description"
          type="text"
          label="Description"
          outlined
        />
        <q-input
          dense
          v-model="form.price"
          type="text"
          label="Price"
          outlined
        />
        <q-input
          dense
          v-model="form.imageUrl"
          type="url"
          label="Image"
          outlined
        />
        <q-btn
          type="submit"
          color="primary"
          label="Create Menu"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useMainStore } from 'stores/mainStore';

const CreateMenu = defineComponent({
  name: 'CreateMenu',
  data() {
    return {
      form: {
        name: '',
        description: '',
        price: '',
        imageUrl: '',
      },
      optionalFields: [
        'imageUrl',
      ],
    };
  },
  computed: {
    ...mapState(useMainStore, ['restaurantId']),
  },
  methods: {
    ...mapActions(useMainStore, ['getMenus', 'createMenu']),
    async handleSubmitted() {
      const payload = this.form;
      Object.keys(payload).forEach((key) => {
        if (!payload[key] && this.optionalFields.includes(key)) {
          delete payload[key];
        }
      });
      const requestWasSuccessful = await this.createMenu(
        payload,
      );
      if (requestWasSuccessful === true) {
        this.getMenus(this.restaurantId);
      }
    },
  },
});
export default CreateMenu;
</script>

<style>
.menuList {
  width: 100%;
}
</style>

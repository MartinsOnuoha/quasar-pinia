<template>
  <q-dialog v-if="isActive" v-model="alert">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">Edit Menu</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
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
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" @click="closeDialog" />
        <q-btn label="Update Menu" @click="handleSubmitted" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useMainStore } from 'stores/mainStore';

const UpdateMenu = defineComponent({
  name: 'UpdateMenu',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    menuItem: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      alert: true,
      form: {
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        menuId: '',
      },
      optionalFields: [
        'imageUrl',
        'description',
        'price',
        'name',
      ],
    };
  },
  watch: {
    isActive(value) {
      if (value) {
        this.form.name = this.menuItem.name;
        this.form.description = this.menuItem.description;
        this.form.price = this.menuItem.price;
        this.form.imageUrl = this.menuItem.imageUrl;
        this.form.menuId = this.menuItem.menuId;
      }
    },
  },
  computed: {
    ...mapState(useMainStore, ['restaurantId']),
  },
  methods: {
    ...mapActions(useMainStore, ['updateMenu', 'getMenus']),
    closeDialog() {
      this.$emit('close');
    },
    async handleSubmitted() {
      const payload = this.form;
      Object.keys(payload).forEach((key) => {
        if (!payload[key] && this.optionalFields.includes(key)) {
          delete payload[key];
        }
      });
      const requestWasSuccessful = await this.updateMenu(payload);

      if (requestWasSuccessful === true) {
        await this.getMenus(this.restaurantId);
        this.$emit('close');
      }
    },
  },
});

export default UpdateMenu;
</script>

<style scoped>

</style>

<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <q-input
        v-model="form.title"
        outlined
        label="Title"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Title is required. Title cannot be empty!',
          (val) =>
            (val && val.length < 150) ||
            'Title cannot be longer than 150 characters',
        ]"
      />
      <q-select
        v-model="form.status"
        :options="options"
        v-if="form.status"
        label="Status"
        class="col-lg-12 col-xs-12"
      />

      <div class="col-12 q-gutter-sm">
        <q-btn
          label="Save"
          color="primary"
          class="float-right"
          icon="save"
          type="submit"
        />
        <q-btn
          label="Cancel"
          color="white"
          class="float-right"
          text-color="primary"
          :to="{ name: 'home' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import taskService from "src/services/tasks";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "FormTask",
  setup() {
    const { post, getById, update } = taskService();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      if (route.params.id) {
        getTask(route.params.id);
      }
    });

    const form = ref({
      title: "",
      status: "",
    });

    const getTask = async (id) => {
      try {
        const [formValue] = await getById(id);
        form.value = formValue;
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value, route.params.id);
        } else {
          await post(form.value);
        }
        if (form.value.id) {
          $q.notify({ message: "Edited", icon: "check", color: "positive" });
        } else {
          $q.notify({ message: "Created", icon: "check", color: "positive" });
        }
        router.push({ name: "home" });
      } catch (error) {
        $q.notify({
          message: "Error! Not logged or error connection server",
          icon: "error",
          color: "negative",
        });
        console.error(error);
      }
    };

    return {
      form,
      onSubmit,
      options: ["Not started", "Started", "Paused", "Done"],
    };
  },
});
</script>

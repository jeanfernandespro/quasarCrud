<template>
  <tool-bar />
  <q-page>
    <div class="row justify-center items-center content-center">
      <div class="col-6 q-gutter-sm q-col-gutter-sm">
        <div class="row justify-center text-h5 text-bold text-primary">
          Create account
        </div>
        <q-card bordered class="q-pa-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              square
              filled
              clearable
              v-model="form.real_name"
              type="text"
              label="Name"
            />
            <q-input
              square
              filled
              clearable
              v-model="form.username"
              type="text"
              label="Username"
            />
            <q-input
              square
              filled
              clearable
              v-model="form.email"
              type="email"
              label="Email"
            />
            <q-input
              square
              filled
              clearable
              v-model="form.user_password"
              type="password"
              label="Password"
            />
            <q-input
              square
              filled
              clearable
              v-model="form.password"
              type="password"
              label="Confirm your password"
            />
            <q-input
              square
              filled
              clearable
              v-model="form.phone"
              type="tel"
              label="Cell Phone"
              mask="(##) ##### - ####"
              fill-mask
            />
            <div class="row justify-between">
              <q-btn
                label="Cancel"
                color="negative"
                text-color="white"
                :to="{ name: 'loginPage' }"
                />
                <q-btn label="Create your account" color="primary" type="submit" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import createsService from "src/services/create";
import { useQuasar } from "quasar";
import ToolBar from "components/ToolBar.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "RegisterPage",

  components: {
    ToolBar,
  },

  setup() {
    const { createUse } = createsService();
    const $q = useQuasar();
    const router = useRouter();

    onMounted(() => {
      const logout = localStorage.getItem("logout");
      if (logout === "false") {
        router.push({ name: "home" });
      }
    });

    const form = ref({
      real_name: "",
      email: "",
      c_email: "",
      phone: "",
      user_password: "",
      password: "",
    });

    const onSubmit = async () => {
      if (
        form.value.user_password !== form.value.password ||
        form.value.email !== form.value.c_email
      ) {
        $q.notify({ message: "Error", icon: "check", color: "negative" });
      } else {
        try {
          await createUse(form.value);
          $q.notify({ message: "Created", icon: "check", color: "positive" });
          router.push({ name: "loginPage" });
        } catch (error) {
          console.error(error);
        }
      }
    };
    return {
      form,
      onSubmit,
    };
  },
});
</script>

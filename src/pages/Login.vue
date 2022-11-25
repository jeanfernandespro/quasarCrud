<template>
  <tool-bar />
  <q-page class="padding">
    <div class="row justify-center items-center content-center">
      <div class="col-6 q-gutter-sm q-col-gutter-y-sm">
        <h1 class="row justify-center text-h5 text-bold text-primary">Login TO-DO List</h1>
        <q-card square bordered class="col-xs-5 q-pa-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              square
              filled
              clearable
              v-model="form.email"
              type="email"
              label="email"
            />
            <q-input
              square
              filled
              clearable
              v-model="form.password"
              type="password"
              label="password"
            />
            <div class="row justify-center">
              <q-btn
                label="Login"
                color="primary"
                type="submit"
              />
            </div>
          </q-form>
          <q-card-section class="row justify-center">
            <p class="text-grey-6">
              Not registered? Create an
              <router-link
                class="text-primary text-weight-bolder text-none"
                :to="{ name: 'registerPage' }"
                >Account</router-link
              >
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import loginService from "src/services/login";
import ToolBar from "components/ToolBar.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "LoginPage",

  components: {
    ToolBar,
  },

  setup() {
    const { login } = loginService();
    const $q = useQuasar();
    const router = useRouter();

    onMounted(() => {
      const logout = localStorage.getItem("logout");
      if (logout === "false") {
        router.push({ name: "home" });
      }
    });

    const form = ref({
      email: "",
      password: "",
    });

    const onSubmit = async () => {
      if (!form.value.email || !form.value.password) {
        $q.notify({
          message: "Email and/or Password is required!",
          icon: "error",
          color: "negative",
        });
      } else {
        try {
          const usuario = {
            email: form.value.email,
            password: form.value.password,
          };
          const { data } = await login(usuario);
          localStorage["userToken"] = data.token;
          localStorage["admin"] = data.user.admin;
          localStorage["logout"] = "false";
          $q.notify({
            message: "Logged!",
            icon: "check",
            color: "positive",
          });
          router.push({ name: "home" });
        } catch (error) {
          console.error(error);
          localStorage.removeItem("admin");
          localStorage.removeItem("userToken");
          localStorage.removeItem("logout");
          router.push({ name: "loginPage" }).then(
            $q.notify({
              message: "Incorrect email or password!",
              icon: "error",
              color: "negative",
            })
          );
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

<style>
.text-none {
  text-decoration: none;
}
</style>

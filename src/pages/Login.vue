<template>
  <q-page class="padding">
    <div class="column">
      <div class="row q-mx-auto">
        <h1 class="text-h5 text-bold text-primary q-my-md">Login TO-DO List</h1>
      </div>
      <div class="row justify-center">
        <q-card square bordered class="col-lg-12 col-xs-6 q-pa-md">
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
                class="col-lg-12 col-xs-4"
              />
            </div>
          </q-form>
          <q-card-section class="text-center q-pa-none">
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
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "LoginPage",
  setup() {
    const { login } = loginService();
    const $q = useQuasar();
    const router = useRouter();

    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      if (localStorage.getItem("loggout")) {
        localStorage.removeItem("loggout");
        window.location.reload();
      }
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
          localStorage.setItem("userToken", data.token);
          localStorage["firstLogin"] = true;
          localStorage["loggout"] = false;
          router.push({ name: "home" }).then(
            $q.notify({
              message: "Logged",
              icon: "check",
              color: "positive",
            })
          );
        } catch (error) {
          console.error(error);
          localStorage.setItem("userToken", "");
          localStorage.removeItem("firstLogin");
          localStorage.removeItem("loggout");
          router.push({ name: "loginPage" }).then(
            $q
              .notify({
                message: "Email and/or Password incorrect!",
                icon: "error",
                color: "negative",
              })
              .then(window.location.reload())
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

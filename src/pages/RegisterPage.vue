<template>
  <q-page class="column">
    <div class="row col-lg-12 col-xs-6 justify-center">
      <h1 class="text-h5 text-bold text-primary">Create new account</h1>
    </div>
    <q-card bordered class="row justify-center">
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            square
            filled
            clearable
            v-model="form.real_name"
            label="Name"
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
            v-model="form.c_email"
            type="email"
            label="Confirm Email"
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
            label="Confirm Password"
          />
          <div class="row justify-center q-gutter-md">
            <q-btn
              label="Cancel"
              color="white"
              text-color="primary"
              :to="{ name: 'loginPage' }"
            />
            <q-btn label="Create account" color="primary" type="submit" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import createsService from "src/services/create";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "RegisterPage",
  setup() {
    const { createUse } = createsService();
    const $q = useQuasar();
    const router = useRouter();

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

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> TO-DO LIST </q-toolbar-title>

        <div class="row q-gutter-md">
          <q-btn
            label="Loggout"
            color="negative"
            dense
            size="sm"
            v-if="teste"
            @click="loggout"
          />
          <div>
            <div>by JeanOmeg</div>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above="false"
        bordered
        v-if="teste"
      >
        <q-list>
          <q-item-label header> Menu </q-item-label>

          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-drawer>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "TO-DO List",
    caption: "",
    icon: "fact_check",
    route: { name: "home" },
  },
  {
    title: "New task",
    caption: "",
    icon: "add_task",
    route: { name: "formTask" },
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const teste = localStorage.getItem("firstLogin");
    const loggout = async () => {
      localStorage.removeItem("firstLogin");
      localStorage["loggout"] = true;
      localStorage.setItem("userToken", "");
      await router.push({ name: "loginPage" }).then(
        $q
          .notify({
            message: "Loggout!",
            icon: "error",
            color: "negative",
          })
      );
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      teste,
      loggout,
    };
  },
});
</script>

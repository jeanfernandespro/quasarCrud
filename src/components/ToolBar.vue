<template>
  <q-toolbar>
    <q-btn
      v-if="teste"
      size="md"
      icon="menu"
      aria-label="Menu"
      @click="toggleLeftDrawer"
    />

    <q-toolbar-title> TO-DO LIST </q-toolbar-title>

    <div class="row q-gutter-md" v-if="teste">
      <q-btn label="Logout" color="negative" size="md" @click="loggout" />
    </div>
  </q-toolbar>
  <q-drawer v-model="leftDrawerOpen" bordered>
    <q-list>
      <q-item-label header> Menu </q-item-label>

      <EssentialLink
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
      />
    </q-list>
  </q-drawer>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
let teste = localStorage.getItem("loggout");
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
  name: "ToolBar",

  components: {
    EssentialLink,
  },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const loggout = async () => {
      localStorage["loggout"] = "true";
      localStorage.setItem("userToken", "");
      $q.notify({
        message: "Loggout!",
        icon: "error",
        color: "negative",
      });
      router.push({ name: "loginPage" });
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

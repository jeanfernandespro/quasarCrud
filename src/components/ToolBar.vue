<template>
  <div>
    <q-header elevated>
      <q-toolbar class="row justify-between bg-primary text-white">
        <div>
          <q-btn
            v-if="logoutif === 'false'"
            size="md"
            icon="menu"
            aria-label="Menu"
            @click="drawer = !drawer"
          />
        </div>
        <div>
          <q-toolbar-title class="text-h3"> TO-DO LIST </q-toolbar-title>
        </div>
        <div>
          <q-btn
            v-if="logoutif === 'false'"
            label="Logout"
            color="negative"
            size="md"
            @click="logout"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
      elevated
      class="bg-white"
    >
      <q-list>
        <q-item-label header class="bg-primary text-white" text>
          Menu
        </q-item-label>
        <div>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </div>
        <div v-if="admin === 'true'">
          <EssentialLink
            v-for="link in adminLinks"
            :key="link.title"
            v-bind="link"
          />
        </div>
      </q-list>
    </q-drawer>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Tasks",
    caption: "",
    icon: "library_add_check",
    route: { name: "home" },
  },
  {
    title: "New task",
    caption: "",
    icon: "add_task",
    route: { name: "formTask" },
  },
];

const adminList = [
  {
    title: "All tasks",
    caption: "",
    icon: "fact_check",
    route: { name: "allTasks" },
  },
  {
    title: "All users",
    caption: "",
    icon: "group",
    route: { name: "formUser" },
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
    const logoutif = localStorage.getItem("logout");
    const admin = localStorage.getItem("admin");
    const logout = async () => {
      localStorage.removeItem("admin");
      localStorage.removeItem("userToken");
      localStorage.removeItem("logout");
      $q.notify({
        message: "Logout!",
        icon: "error",
        color: "negative",
      });
      router.push({ name: "loginPage" });
    };

    return {
      essentialLinks: linksList,
      adminLinks: adminList,
      logoutif,
      admin,
      drawer: ref(false),
      miniState: ref(true),
      logout,
    };
  },
});
</script>

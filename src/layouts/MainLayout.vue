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

        <div>by JeanOmeg</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above="false"
        bordered
        v-if="!teste"
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

const linksList = [
  {
    title: "Login",
    caption: "",
    icon: "home",
    route: { name: "loginPage" },
  },
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
    const leftDrawerOpen = ref(false);
    const teste = localStorage.getItem("firstLogin");
    console.log(teste);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      teste,
    };
  },
});
</script>

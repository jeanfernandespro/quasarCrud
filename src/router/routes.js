const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "loginPage",
        component: () => import("pages/Login.vue"),
      },
      {
        path: "register-page",
        name: "registerPage",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "home",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "form-task/:id?",
        name: "formTask",
        component: () => import("pages/FormTask.vue"),
      },
      {
        path: "all-tasks",
        name: "allTasks",
        component: () => import("src/pages/AdmTasksPage.vue"),
      },
      {
        path: "form-user/:id?",
        name: "formUser",
        component: () => import("pages/FormTask.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

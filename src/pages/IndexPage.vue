<template>
  <q-page padding>
    <q-table title="Tasks" :rows="tasks" :columns="columns" row-key="index">
      <template v-slot:top>
        <span class="text-h5">Tasks</span>
        <q-space />
        <q-btn color="primary" label="New Task" :to="{ name: 'formTask' }" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="primary"
            dense
            size="sm"
            @click="editTask(props.row.id)"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="deleteTask(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import tasksService from "src/services/tasks";
import reset from "src/functions/refreshPage";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const tasks = ref([]);
    const { list, remove } = tasksService();
    const { resetLoad } = reset();
    const columns = [
      {
        name: "index",
        label: "#",
        field: "index",
        align: "left",
        sortable: true,
      },
      {
        name: "title",
        field: "title",
        label: "Task",
        align: "left",
        sortable: true,
      },
      {
        name: "status",
        field: "status",
        label: "Status",
        align: "left",
        sortable: true,
      },
      {
        name: "created_at",
        field: "created_at",
        label: "Create",
        align: "left",
        sortable: true,
      },
      {
        name: "update_at",
        field: "update_at",
        label: "Update",
        align: "left",
        sortable: true,
      },
      {
        name: "actions",
        field: "actions",
        label: "Actions",
        align: "right",
      },
    ];

    const $q = useQuasar();
    const router = useRouter();

    onMounted(() => {
      if (localStorage.getItem("loggout") === null) {
        router.push({ name: "loginPage" });
      } else if (localStorage.getItem("loggout") === true) {
        router.push({ name: "loginPage" });
      } else {
        resetLoad();
        getTasks();
      }
    });

    let rows = [];
    let taskList = [];

    const getTasks = async () => {
      try {
        const data = await list();
        tasks.value = data;
        taskList = tasks.value;
        rows = [];
        for (let i = 0; i < taskList.length; i++) {
          rows = rows.concat(taskList[i]);
        }
        rows.forEach((row, index) => {
          row.index = ++index;
        });
      } catch (error) {
        $q.notify({
          message: "Not logged!",
          icon: "error",
          color: "negative",
        });
        console.log(error);
      }
    };

    const deleteTask = async (id) => {
      try {
        $q.dialog({
          title: "Delete",
          message: "Do you want to delete this task?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id);
          $q.notify({ message: "Deleted", icon: "check", color: "positive" });
          await getTasks();
        });
      } catch (error) {
        $q.notify({ message: "Error!", icon: "times", color: "negative" });
      }
    };

    const editTask = (id) => {
      router.push({ name: "formTask", params: { id } });
    };

    return {
      tasks,
      columns,
      deleteTask,
      editTask,
    };
  },
});
</script>

import admTaskApi from "src/composables/AdmTaskApi";

export default function admTasksService() {
  const { listAllTasks, post, update, remove, getById } = admTaskApi("admtasks");

  return {
    listAllTasks,
    post,
    update,
    remove,
    getById,
  };
}

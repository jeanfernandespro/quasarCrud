import useApi from "src/composables/UseApi";

export default function tasksService() {
  const { listByIdUser, post, update, remove, getById } = useApi("tasks");

  return {
    listByIdUser,
    post,
    update,
    remove,
    getById,
  };
}

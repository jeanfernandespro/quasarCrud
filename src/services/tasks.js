import useApi from "src/composables/UseApi";

export default function tasksService() {
  const { list, listByMail, post, update, remove, getById } = useApi("tasks");

  return {
    list,
    listByMail,
    post,
    update,
    remove,
    getById,
  };
}

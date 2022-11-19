import createApi from "src/composables/CreateApi";

export default function createsService() {
  const { createUse } = createApi("users");

  return {
    createUse,
  };
}

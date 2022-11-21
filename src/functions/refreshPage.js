export default function reset() {
  const resetLoad = () => {
    if (!localStorage.getItem("firstLoad")) {
      localStorage["firstLoad"] = true;
      window.location.reload();
    } else localStorage.removeItem("firstLoad");
  };

  return {
    resetLoad,
  };
}

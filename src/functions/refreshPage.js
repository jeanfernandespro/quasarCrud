export default function reset() {
  const resetLoad = () => {
    if (!localStorage.getItem("firstLoad")) {
      localStorage["firstLoad"] = true;
      window.location.reload();
    } else localStorage.removeItem("firstLoad");
  };

  const resetLogin = () => {
    if (!localStorage.getItem("firstLogin")) {
      localStorage["firstLogin"] = true;
    } else localStorage.removeItem("firstLogin");
  };

  return {
    resetLoad,
    resetLogin,
  };
}

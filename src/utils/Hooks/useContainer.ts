const useContainer = (): HTMLElement => {
  const container = document.getElementById("app-modals");
  return container ? container : document.body;
};

export default useContainer;

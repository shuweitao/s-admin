import { defineStore } from "pinia";

const useCollapseStore = defineStore("collapse", {
  state: () => ({
    isCollaps: false,
  }),
  getters: {
    getIsCollaps: (state) => state.isCollaps,
  },
  actions: {
    toggleCollapse() {
      this.isCollaps = !this.isCollaps;
    },
  },
});

export default useCollapseStore;

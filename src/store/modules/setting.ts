import { defineStore } from "pinia";
const useLayoutSettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false,
      refresh: false,
    };
  },
  getters: {},
  actions: {},
});
export default useLayoutSettingStore;

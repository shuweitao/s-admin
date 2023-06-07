import useCollapseStore from "@/store/layout/collapse";
import { computed, ComputedRef } from "vue";

const useCollapse = (): [ComputedRef<boolean>, () => void] => {
  const collapseStore = useCollapseStore();
  const isCollapse = computed(() => collapseStore.getIsCollaps);
  const handleCollapseClick = () => {
    collapseStore.toggleCollapse();
  };
  return [isCollapse, handleCollapseClick];
};

export default useCollapse;

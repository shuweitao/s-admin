const contentConfig = {
  pageName: "menu",
  header: {
    title: "菜单列表",
    btnTitle: "新建菜单",
  },
  childrenTree: {
    rowKey: "id",
    treeProps: {
      children: "children",
    },
  },
  propsList: [
    { label: "名称", prop: "name", width: "150px" },
    { label: "备注", prop: "description" },
    {
      type: "custom",
      label: "菜单类型",
      prop: "type",
      slotName: "type",
      width: "100px",
    },
    { label: "路由地址", prop: "path" },
    { label: "菜单图标", prop: "icon" },
    {
      type: "custom",
      label: "是否隐藏",
      prop: "hidden",
      slotName: "hidden",
      width: "100px",
    },
    { label: "排序", prop: "sort" },
    {
      type: "custom",
      label: "状态",
      prop: "status",
      slotName: "status",
      width: "100px",
    },
    { type: "timer", label: "创建时间", prop: "created_at" },
    { type: "timer", label: "更新时间", prop: "updated_at" },
    { type: "handler", label: "操作", width: "180px" },
  ],
};

export default contentConfig;

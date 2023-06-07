const contentConfig = {
  pageName: "role",
  header: {
    title: "角色列表",
    btnTitle: "新建角色",
  },
  propsList: [
    { type: "index", label: "序号", width: "80px", align: "center" },
    { type: "normal", label: "名称", prop: "name", width: "150px" },
    { type: "normal", label: "备注", prop: "description" },
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

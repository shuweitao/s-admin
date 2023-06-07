const contentConfig = {
  pageName: "category",
  header: {
    title: "栏目列表",
    btnTitle: "新建栏目",
  },
  propsList: [
    { type: "index", label: "序号", width: "80px", align: "center" },
    { type: "normal", label: "栏目名称", prop: "title", width: "150px" },
    { type: "normal", label: "文章数", prop: "article_count", width: "150px" },
    { type: "normal", label: "排序", prop: "sort" },
    {
      type: "custom",
      label: "状态",
      prop: "status",
      slotName: "status",
      width: "100px",
    },
    { type: "timer", label: "创建时间", prop: "created_at" },
    { type: "handler", label: "操作", width: "180px" },
  ],
};

export default contentConfig;

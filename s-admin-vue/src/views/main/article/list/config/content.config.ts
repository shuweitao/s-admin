const contentConfig = {
  pageName: "role",
  header: {
    title: "文章列表",
    btnTitle: "新建文章",
  },
  propsList: [

    {type: "index", label: "序号", width: "80px", align: "center"},
    {type: "normal", label: "名称", prop: "title", width: "150px"},
    {
      type: "custom",
      label: "封面",
      prop: "image",
      slotName: "image",
      width: "100px",
    },

    {type: "normal", label: "栏目", prop: "category_id"},
    {type: "normal", label: "作者", prop: "author"},
    {type: "normal", label: "浏览量", prop: "click"},
    {
      type: "custom",
      label: "状态",
      prop: "status",
      slotName: "status",
      width: "100px",
    },

    {type: "normal", label: "排序", prop: "sort"},
    {type: "timer", label: "发布时间", prop: "created_at"},
    {type: "handler", label: "操作", width: "180px"},
  ],
};

export default contentConfig;

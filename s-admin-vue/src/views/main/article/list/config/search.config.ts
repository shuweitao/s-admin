const searchConfig = {
  labelWidth: "80px",
  formItems: [
    {
      type: "input",
      prop: "title",
      label: "文章标题",
      placeholder: "请输入查询的文章标题",
      defaultValue: "",
    },
    {
      type: "select",
      prop: "category_id",
      label: "栏目名称",
      options: [
        {
          label: "全部",
          value: "",
        }
      ]
    }, {
      type: "select",
      prop: "status",
      label: "文章状态",
      defaultValue: -1,
      options: [
        {
          label: "全部",
          value: -1,
        },
        {
          label: "显示",
          value: 1,
        },
        {
          label: "隐藏",
          value: 0,
        }
      ]
    },
    {
      type: "date-picker",
      prop: "created_at",
      label: "发布时间",
    },
  ],
};

export default searchConfig;

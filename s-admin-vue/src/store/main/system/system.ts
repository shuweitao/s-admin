import { defineStore } from "pinia";
import { deletePageById, editPageData, newPageData, postPageListData } from "@/api/system";
import { ISystemState } from "@/store/main/system/type";


const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    pageList: [],
    pageTotalCount: 0
  }),
  getters: {
    getUserList: (state) => state.pageList
  },
  actions: {
    async postPageListAction(pageName: string, data: any) {
      const pageListResult = await postPageListData(pageName, data)
      const { list} = pageListResult.data
      this.pageTotalCount = pageListResult.data.page_info.total_count
      this.pageList = list
    },

    async deletePageByIdAction(pageName: string, id: number) {
      // 1.删除数据操作
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, {pageSize: 10, page: 1})
    },

    async newPageDataAction(pageName: string, userInfo: any) {
      // 1.创建新的用户
      const newResult = await newPageData(pageName, userInfo)
      console.log(newResult)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, {pageSize: 10, page: 1})
    },
    async editPageDataAction(pageName: string, id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editPageData(pageName, id, userInfo)
      console.log(editResult)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, {pageSize: 10, page: 1})
    },
  }
})

export default useSystemStore

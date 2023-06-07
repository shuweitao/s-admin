const cpn = () => import('@/views/main/article/list/edit/edit.vue')
export default {
  path: '/main/article/list/edit',
  name: 'edit',
  meta: { title:'文章添加/编辑', notNeedCache: false },
  component: cpn,
  children: []
}

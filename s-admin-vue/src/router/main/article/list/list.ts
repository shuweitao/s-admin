const cpn = () => import('@/views/main/article/list/list.vue')
export default {
  path: '/main/article/list',
  name: 'list',
  meta: { title:'文章管理', notNeedCache: false },
  component: cpn,
  children: []
}

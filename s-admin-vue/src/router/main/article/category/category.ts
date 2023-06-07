const cpn = () => import('@/views/main/article/category/category.vue')
export default {
  path: '/main/article/category',
  name: 'category',
  meta: { title:'文章栏目', notNeedCache: false },
  component: cpn,
  children: []
}

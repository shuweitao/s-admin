const menu = () => import('@/views/main/system/menu/menu.vue')
export default {
  path: '/main/system/menu',
  name: 'menu',
  meta: { title:'菜单管理', notNeedCache: false },
  component: menu,
  children: []
}

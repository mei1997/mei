import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */


 

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'profileIndex',
        meta: { title: '我的主页', icon: 'user', noCache: true }
      }
    ]
  }
  
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/scenic',
    component: Layout,
    redirect:'/scenic/list',
    hidden: false,
    name: '景点',
    meta: {title: '景点',icon: 'guide'},
    children: [
      {
        path: 'list',
        component: () => import('@/views/scenic/list'),
        name: '景点百科',
        meta: {title: '景点百科',icon: 'documentation',affix: true,roles: ['admin','editor']}
      },
      {
        path: 'add',
        component: ()=> import('@/views/scenic/add'),
        name: '添加景点',
        meta: {title: '添加景点',icon:'documentation',affix: true,roles: ['admin','editor']}
      },
    ]
  },
  {
    path: 'scenic',
    component: Layout,
    redirect:'/scenic/editor',
    hidden: true,
    children:[
      {
        path: 'editor',
        component: () => import('@/views/scenic/editor'),
        hidden: true,
        name: 'scenicDetail',
        meta: {title: '景点详情',icon: 'documentation',affix: true}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/register',
    hidden: false,
    children: [
      {
        path: 'register',
        component: () => import('@/views/login/register'),
        name: '注册页面',
        meta: {title:'注册页面', icon: 'documentation', affix: true}
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    redirect:'/manage/users',
    hidden: false,
    name: '后台管理',
    meta: {title: '后台管理',icon: 'tree',roles:['admin']},
    children: [
      {
        path: 'users',
        component: () => import('@/views/manage/users'),
        name: '用户管理',
        meta: {title:'用户管理',icon: 'peoples',affix: true,roles:['admin']}
      },
      {
        path: 'roles',
        component: () => import('@/views/manage/roles'),
        name: '角色管理',
        meta: {title:'角色管理',icon: 'people',affix: true,roles:['admin']}
      }
  ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

import { createRouter, createWebHashHistory } from 'vue-router';
// 打包时将单个路由组件分片打包，访问时才异步加载，可以有效降低app尺寸和加载时间
// 定义异步路由
const pageList = ['CourseList', 'CourseAdd', 'CourseDetail', 'NotFound', 'Login']
const CourseList = () => import('/comps/CourseList.vue');
const CourseAdd = () => import('/comps/CourseAdd.vue');
const CourseDetail = () => import('/comps/CourseDetail.vue');
const NotFound = () => import('/comps/NotFound.vue');
const Login = () => import('/comps/Login.vue');

// 1.配置
const routes = [
  { path: '/', redirect: '/course', component: CourseList, },
  { path: '/course', component: CourseList, name: 'list', children:
      [
        { path: '/course/:id', name: 'detail', component: CourseDetail, }
      ],
  },
  // 下面配置会匹配所有path，匹配内容放入`$route.params.pathMatch`
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, },
  { path: '/login', name: 'login', component: Login, }
  // 匹配所有以`/user-`开头path，匹配内容放入`$route.params.afterUser`
  // { path: '/user-:afterUser(.*)', component: UserGeneric },
];

const authRoutes = [
  { path: '/course/add', name: 'add', parent: 'list', component: CourseAdd, },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

let hasAuth = false;
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    if (hasAuth) next();
    else {
      hasAuth = true;
      authRoutes.forEach(route => {
        if (route.parent) router.addRoute(route.parent, route);
        else router.addRoute(route);
      });
      next({ ...to, replace: true, });
    }
  } else {
    if(whiteList.includes(to.path)) next();
    else next({ path: '/login', query: { redirect: to.path }, });
  }
});

// 2.创建实例
export default router;

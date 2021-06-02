import { createRouter, createWebHashHistory } from 'vue-router';
import CourseList from '/comps/CourseList.vue';
import CourseAdd from '/comps/CourseAdd.vue';
import CourseDetail from '/comps/CourseDetail.vue';
import NotFound from '/comps/NotFound.vue';
import Login from '/comps/Login.vue';
// 1.配置
const routes = [{
  path: '/',
  redirect: '/course',
  component: CourseList,
}, {
  path: '/course',
  component: CourseList,
  children: [{
    path: '/course/add',
    name: 'add',
    meta: {
      requireAuth: true,
    },
    component: CourseAdd,
  }, {
    path: '/course/:id',
    name: 'detail',
    component: CourseDetail,
  }],
}, // 下面配置会匹配所有path，匹配内容放入`$route.params.pathMatch`
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
  // 匹配所有以`/user-`开头path，匹配内容放入`$route.params.afterUser`
  // { path: '/user-:afterUser(.*)', component: UserGeneric },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 这样就不用像之前那样写死了
  if (to.meta.requireAuth) {
    // 判断是否登录
    if (localStorage.getItem('token')) {
      // 已登录
      next();
    } else {
      // 未登录
      next({
        path: '/login',
        query: { redirect: to.path },
      });
    }
  } else {
    next();
  }
});

// 2.创建实例
export default router;
